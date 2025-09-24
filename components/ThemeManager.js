/**
 * Theme Management Component
 */
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('v4u-theme') || 'light';
    this.themes = {
      light: {
        name: 'Light',
        icon: 'fas fa-sun',
        preview: 'light-preview'
      },
      dark: {
        name: 'Dark', 
        icon: 'fas fa-moon',
        preview: 'dark-preview'
      },
      blue: {
        name: 'Professional',
        icon: 'fas fa-briefcase',
        preview: 'blue-preview'
      }
    };
    
    this.themeModal = null;
    this.themeToggle = null;
    
    this.init();
  }

  init() {
    this.createThemeToggle();
    this.createThemeModal();
    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  createThemeToggle() {
    this.themeToggle = document.getElementById('theme-toggle');
    if (!this.themeToggle) {
      console.warn('Theme toggle button not found');
      return;
    }
  }

  createThemeModal() {
    this.themeModal = document.getElementById('theme-modal');
    if (!this.themeModal) {
      this.themeModal = document.createElement('div');
      this.themeModal.className = 'theme-modal';
      this.themeModal.id = 'theme-modal';
      this.themeModal.innerHTML = this.getThemeModalHTML();
      document.body.appendChild(this.themeModal);
    }
  }

  getThemeModalHTML() {
    const themesHTML = Object.entries(this.themes).map(([key, theme]) => `
      <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
              data-theme="${key}" 
              aria-label="Switch to ${theme.name} theme">
        <div class="theme-preview ${theme.preview}">
          <i class="${theme.icon}"></i>
        </div>
        <span>${theme.name}</span>
      </button>
    `).join('');

    return `
      <div class="theme-options">
        ${themesHTML}
      </div>
    `;
  }

  bindEvents() {
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleModal();
      });
    }

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
      if (this.themeModal && 
          !this.themeModal.contains(e.target) && 
          !this.themeToggle?.contains(e.target)) {
        this.closeModal();
      }
    });

    // Theme option clicks
    if (this.themeModal) {
      this.themeModal.addEventListener('click', (e) => {
        const themeOption = e.target.closest('.theme-option');
        if (themeOption) {
          const theme = themeOption.dataset.theme;
          this.changeTheme(theme);
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.themeModal?.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  toggleModal() {
    if (!this.themeModal) return;
    
    if (this.themeModal.classList.contains('active')) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  openModal() {
    if (!this.themeModal) return;
    
    this.themeModal.classList.add('active');
    
    // Position modal near toggle button
    if (this.themeToggle) {
      const rect = this.themeToggle.getBoundingClientRect();
      this.themeModal.style.top = `${rect.bottom + 10}px`;
      this.themeModal.style.right = `${window.innerWidth - rect.right}px`;
    }
  }

  closeModal() {
    if (!this.themeModal) return;
    this.themeModal.classList.remove('active');
  }

  changeTheme(theme) {
    if (!this.themes[theme]) return;
    
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.updateActiveThemeOption();
    this.saveTheme(theme);
    this.closeModal();
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme } 
    }));
  }

  applyTheme(theme) {
    // Apply to both body and document element for comprehensive coverage
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    
    const themeColors = {
      light: '#ffffff',
      dark: '#0f172a',
      blue: '#1e40af'
    };
    
    metaThemeColor.content = themeColors[theme] || themeColors.light;
  }

  updateActiveThemeOption() {
    if (!this.themeModal) return;
    
    const themeOptions = this.themeModal.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === this.currentTheme) {
        option.classList.add('active');
      }
    });
  }

  saveTheme(theme) {
    localStorage.setItem('v4u-theme', theme);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  getAvailableThemes() {
    return Object.keys(this.themes);
  }
}

export default ThemeManager;