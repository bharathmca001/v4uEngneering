/**
 * Animation Manager Component
 */
class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.animations = new Map();
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupParallaxEffects();
  }

  setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.service-card, .project-card, .about-content, .contact-content, .fade-in'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animation for grouped elements
            this.addStaggeredAnimation(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    animatedElements.forEach(element => {
      element.classList.add('animate-on-scroll');
      observer.observe(element);
    });

    this.observers.set('scroll', observer);
  }

  addStaggeredAnimation(element) {
    const parent = element.closest('.services-grid, .projects-grid');
    if (!parent) return;

    const siblings = Array.from(parent.children);
    const index = siblings.indexOf(element);
    
    if (index !== -1) {
      element.style.animationDelay = `${index * 0.1}s`;
    }
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });

    this.observers.set('counter', counterObserver);
  }

  animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(target * this.easeOutQuart(progress));
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.bg-shape, .parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    const handleParallax = this.throttle(() => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach((element, index) => {
        const speed = element.dataset.speed || (index + 1) * 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    }, 10);
    
    window.addEventListener('scroll', handleParallax);
  }

  // Animation utilities
  easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Public methods
  animateElement(element, animation, duration = 1000) {
    return new Promise((resolve) => {
      element.style.animation = `${animation} ${duration}ms ease-out`;
      
      const handleAnimationEnd = () => {
        element.removeEventListener('animationend', handleAnimationEnd);
        element.style.animation = '';
        resolve();
      };
      
      element.addEventListener('animationend', handleAnimationEnd);
    });
  }

  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.opacity = '1';
    });
    
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  fadeOut(element, duration = 300) {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }

  slideDown(element, duration = 300) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease`;
    
    const height = element.scrollHeight;
    
    requestAnimationFrame(() => {
      element.style.height = height + 'px';
    });
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.height = '';
        element.style.overflow = '';
        element.style.transition = '';
        resolve();
      }, duration);
    });
  }

  slideUp(element, duration = 300) {
    element.style.height = element.offsetHeight + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease`;
    
    requestAnimationFrame(() => {
      element.style.height = '0';
    });
    
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.height = '';
        element.style.overflow = '';
        element.style.transition = '';
        resolve();
      }, duration);
    });
  }

  // Cleanup
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animations.clear();
  }
}

export default AnimationManager;