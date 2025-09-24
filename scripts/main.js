// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('v4u-theme') || 'light';
    this.themeModal = document.getElementById('theme-modal');
    this.themeToggle = document.getElementById('theme-toggle');
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.bindEvents();
    this.updateActiveThemeOption();
  }

  bindEvents() {
    this.themeToggle.addEventListener('click', () => {
      this.toggleModal();
    });

    document.addEventListener('click', (e) => {
      if (!this.themeModal.contains(e.target) && !this.themeToggle.contains(e.target)) {
        this.closeModal();
      }
    });

    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        this.changeTheme(theme);
      });
    });
  }

  toggleModal() {
    this.themeModal.classList.toggle('active');
  }

  closeModal() {
    this.themeModal.classList.remove('active');
  }

  changeTheme(theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.updateActiveThemeOption();
    localStorage.setItem('v4u-theme', theme);
    this.closeModal();
  }

  applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    // Also set on document element for broader coverage
    document.documentElement.setAttribute('data-theme', theme);
  }

  updateActiveThemeOption() {
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === this.currentTheme) {
        option.classList.add('active');
      }
    });
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    this.hamburger.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    window.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }

  closeMobileMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.style.boxShadow = 'var(--shadow-medium)';
    } else {
      this.navbar.style.boxShadow = 'var(--shadow-light)';
    }
  }
}

// Scroll Animation Manager
class ScrollAnimationManager {
  constructor() {
    this.elements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-content');
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    this.elements.forEach(element => {
      element.classList.add('fade-in');
      this.observer.observe(element);
    });
  }
}

// Contact Form Manager
class ContactFormManager {
  constructor() {
    this.form = document.getElementById('contact-form');
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission
      await this.simulateSubmission();
      
      // Show success message
      this.showMessage('Thank you! Your message has been sent successfully.', 'success');
      this.form.reset();
    } catch (error) {
      // Show error message
      this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  simulateSubmission() {
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  showMessage(message, type) {
    // Create and show notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Parallax effect for hero background shapes
function initParallax() {
  const shapes = document.querySelectorAll('.bg-shape');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.3;
      shape.style.transform = `translateY(${rate * speed}px)`;
    });
  });
}

// Counter animation for stats
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/\d/g, '');
        
        animateCounter(target, 0, numericValue, suffix, 2000);
        observer.unobserve(target);
      }
    });
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(element, start, end, suffix, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(start + (end - start) * easeOutQuart(progress));
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new NavigationManager();
  new ScrollAnimationManager();
  new ContactFormManager();
  
  initSmoothScrolling();
  initParallax();
  initCounterAnimation();
  
  // Add loading animation to page elements
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Add initial loading state
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// Handle window resize
window.addEventListener('resize', () => {
  // Close mobile menu on resize
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debouncing to scroll-heavy functions
const debouncedParallax = debounce(() => {
  const shapes = document.querySelectorAll('.bg-shape');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.3;
    shape.style.transform = `translateY(${rate * speed}px)`;
  });
}, 10);

window.addEventListener('scroll', debouncedParallax);