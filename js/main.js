/**
 * Main Application Entry Point
 */
import ThemeManager from '../components/ThemeManager.js';
import Navigation from '../components/Navigation.js';
import AnimationManager from '../components/AnimationManager.js';
import ServiceManager from '../components/ServiceManager.js';
import NotificationManager from '../components/NotificationManager.js';
import Form from '../components/Form.js';
import Card from '../components/Card.js';

class V4UApp {
  constructor() {
    this.components = {};
    this.init();
  }

  async init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Initialize core components
      this.components.themeManager = new ThemeManager();
      this.components.navigation = new Navigation();
      this.components.animationManager = new AnimationManager();
      this.components.serviceManager = new ServiceManager();
      this.components.notificationManager = new NotificationManager();
      
      // Initialize forms
      this.initializeForms();
      
      // Initialize dynamic content
      this.initializeDynamicContent();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Show app loaded notification
      setTimeout(() => {
        this.components.notificationManager.success('Welcome to V4U Engineering!', 3000);
      }, 1000);
      
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }

  initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      this.components.contactForm = new Form(contactForm, {
        validationRules: {
          name: {
            minLength: 2,
            message: 'Name must be at least 2 characters'
          },
          email: {
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            message: 'Please enter a valid email address'
          },
          message: {
            minLength: 10,
            message: 'Message must be at least 10 characters'
          }
        },
        submitHandler: async (formData) => {
          // Simulate API call
          await this.submitContactForm(formData);
        }
      });
    }
  }

  async submitContactForm(formData) {
    // Simulate API submission
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) { // 90% success rate
          resolve({ success: true, message: 'Form submitted successfully' });
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }

  initializeDynamicContent() {
    // Initialize hero cards
    this.createHeroCards();
    
    // Initialize service cards
    this.createServiceCards();
    
    // Initialize project cards
    this.createProjectCards();
    
    // Initialize stats
    this.createStatCards();
  }

  createHeroCards() {
    const heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual) return;

    const heroCards = [
      {
        icon: 'fas fa-drafting-compass',
        title: 'Precision Design',
        description: 'Advanced CAD solutions for complex structures'
      },
      {
        icon: 'fas fa-cogs',
        title: 'Engineering Analysis',
        description: 'Comprehensive structural analysis and optimization'
      }
    ];

    heroVisual.innerHTML = '';
    heroCards.forEach((cardData, index) => {
      const card = new Card({
        type: 'hero',
        ...cardData,
        animationDelay: index * 0.2
      });
      heroVisual.appendChild(card.render());
    });
  }

  createServiceCards() {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    const services = [
      {
        id: 'steel-detailing',
        icon: 'fas fa-building',
        title: 'Steel Detailing',
        description: 'Precise 3D modeling and detailed drawings for steel structures with comprehensive material lists and connection details.',
        features: ['3D Modeling & Visualization', 'Connection Design', 'Material Optimization', 'Code Compliance']
      },
      {
        id: 'structural-analysis',
        icon: 'fas fa-calculator',
        title: 'Structural Analysis',
        description: 'Advanced structural analysis using state-of-the-art software to ensure safety and optimize design efficiency.',
        features: ['Load Analysis', 'Seismic Design', 'Wind Load Assessment', 'Performance Optimization']
      },
      {
        id: 'ai-solutions',
        icon: 'fas fa-robot',
        title: 'AI-Powered Solutions',
        description: 'Leveraging artificial intelligence to enhance design processes and improve project efficiency and accuracy.',
        features: ['Automated Detailing', 'Design Optimization', 'Quality Assurance', 'Process Automation']
      },
      {
        id: 'project-management',
        icon: 'fas fa-chart-line',
        title: 'Project Management',
        description: 'Complete project lifecycle management ensuring timely delivery and quality standards throughout execution.',
        features: ['Timeline Management', 'Quality Control', 'Progress Tracking', 'Client Communication']
      },
      {
        id: 'cad-services',
        icon: 'fas fa-tools',
        title: 'CAD Services',
        description: 'Professional CAD drafting and design services using industry-leading software and best practices.',
        features: ['2D Technical Drawings', '3D Modeling', 'Rendering & Visualization', 'Documentation']
      },
      {
        id: 'consulting',
        icon: 'fas fa-handshake',
        title: 'Consulting',
        description: 'Expert engineering consultation to guide your projects from concept to completion with professional insights.',
        features: ['Technical Advisory', 'Code Review', 'Risk Assessment', 'Best Practices']
      }
    ];

    servicesGrid.innerHTML = '';
    services.forEach((serviceData, index) => {
      const card = new Card({
        type: 'service',
        ...serviceData,
        className: 'fade-in',
        animationDelay: index * 0.1,
        onClick: () => {
          this.components.serviceManager.openServiceDetail(serviceData.id);
        }
      });
      
      const cardElement = card.render();
      cardElement.dataset.service = serviceData.id;
      servicesGrid.appendChild(cardElement);
    });
  }

  createProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    const projects = [
      {
        title: 'Metro Commercial Tower',
        description: 'Comprehensive steel detailing and structural analysis for a modern commercial complex.',
        image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Steel Detailing', 'CAD Design']
      },
      {
        title: 'Manufacturing Plant Design',
        description: 'Large-scale industrial facility with specialized steel framework and equipment foundations.',
        image: 'https://images.pexels.com/photos/256297/pexels-photo-256297.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Industrial Design', 'Structural Analysis']
      },
      {
        title: 'Highway Bridge Project',
        description: 'Structural engineering and detailing for critical infrastructure development.',
        image: 'https://images.pexels.com/photos/210126/pexels-photo-210126.jpeg?auto=compress&cs=tinysrgb&w=800',
        tags: ['Bridge Design', 'Infrastructure']
      }
    ];

    projectsGrid.innerHTML = '';
    projects.forEach((projectData, index) => {
      const card = new Card({
        type: 'project',
        ...projectData,
        className: 'fade-in',
        animationDelay: index * 0.1
      });
      projectsGrid.appendChild(card.render());
    });
  }

  createStatCards() {
    const statsContainer = document.querySelector('.about-stats');
    if (!statsContainer) return;

    const stats = [
      { value: '500+', title: 'Projects Completed' },
      { value: '15+', title: 'Years Experience' },
      { value: '50+', title: 'Expert Engineers' },
      { value: '99%', title: 'Client Satisfaction' }
    ];

    statsContainer.innerHTML = '';
    stats.forEach((statData, index) => {
      const card = new Card({
        type: 'stat',
        ...statData,
        animationDelay: index * 0.1
      });
      statsContainer.appendChild(card.render());
    });
  }

  setupGlobalEvents() {
    // Theme change events
    document.addEventListener('themeChanged', (e) => {
      console.log('Theme changed to:', e.detail.theme);
    });

    // Performance monitoring
    window.addEventListener('load', () => {
      this.trackPerformance();
    });

    // Error handling
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.components.notificationManager?.error('An unexpected error occurred');
    });
  }

  trackPerformance() {
    if ('performance' in window) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);
    }
  }

  // Public API
  getComponent(name) {
    return this.components[name];
  }

  showNotification(message, type, duration) {
    return this.components.notificationManager?.show(message, type, duration);
  }

  changeTheme(theme) {
    this.components.themeManager?.changeTheme(theme);
  }
}

// Initialize application
const app = new V4UApp();

// Make app globally available for debugging
window.V4UApp = app;

export default V4UApp;