/**
 * Navigation Component
 */
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.isMenuOpen = false;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
    this.setActiveLink();
  }

  bindEvents() {
    // Hamburger menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // Navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleNavClick(e, link);
      });
    });

    // Scroll handling
    window.addEventListener('scroll', () => {
      this.handleScroll();
      this.setActiveLink();
    });

    // Resize handling
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.navMenu?.contains(e.target) && 
          !this.hamburger?.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;
    
    this.hamburger.classList.add('active');
    this.navMenu.classList.add('active');
    this.isMenuOpen = true;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Add animation delay to menu items
    this.navLinks.forEach((link, index) => {
      link.style.animationDelay = `${index * 0.1}s`;
    });
  }

  closeMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;
    
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    this.isMenuOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Remove animation delays
    this.navLinks.forEach(link => {
      link.style.animationDelay = '';
    });
  }

  handleNavClick(e, link) {
    const href = link.getAttribute('href');
    
    // Handle internal links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      this.scrollToSection(href);
      this.closeMobileMenu();
    }
  }

  scrollToSection(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;
    
    const offsetTop = target.offsetTop - (this.navbar?.offsetHeight || 80);
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }

  handleScroll() {
    if (!this.navbar) return;
    
    const scrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }

  setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + (this.navbar?.offsetHeight || 80) + 50;
    
    let activeSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        activeSection = section.id;
      }
    });
    
    // Update active nav link
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }

  handleResize() {
    // Close mobile menu on desktop
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.closeMobileMenu();
    }
  }

  // Public methods
  highlightLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  addNavItem(text, href, position = 'end') {
    if (!this.navMenu) return;
    
    const navItem = document.createElement('li');
    navItem.className = 'nav-item';
    navItem.innerHTML = `<a href="${href}" class="nav-link">${text}</a>`;
    
    if (position === 'start') {
      this.navMenu.insertBefore(navItem, this.navMenu.firstChild);
    } else {
      this.navMenu.appendChild(navItem);
    }
    
    // Re-bind events
    const newLink = navItem.querySelector('.nav-link');
    newLink.addEventListener('click', (e) => {
      this.handleNavClick(e, newLink);
    });
  }
}

export default Navigation;