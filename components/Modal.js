/**
 * Reusable Modal Component
 */
class Modal {
  constructor(options = {}) {
    this.id = options.id || 'modal';
    this.title = options.title || '';
    this.content = options.content || '';
    this.size = options.size || 'medium'; // small, medium, large
    this.closable = options.closable !== false;
    this.backdrop = options.backdrop !== false;
    this.onOpen = options.onOpen || (() => {});
    this.onClose = options.onClose || (() => {});
    this.className = options.className || '';
    
    this.modal = null;
    this.isOpen = false;
  }

  create() {
    if (this.modal) return this.modal;

    this.modal = document.createElement('div');
    this.modal.className = `modal ${this.className}`;
    this.modal.id = this.id;
    this.modal.innerHTML = this.getModalHTML();
    
    document.body.appendChild(this.modal);
    this.attachEventListeners();
    
    return this.modal;
  }

  getModalHTML() {
    return `
      <div class="modal-content modal-${this.size}">
        ${this.closable ? `
          <button class="modal-close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
        ` : ''}
        ${this.title ? `
          <div class="modal-header">
            <h2>${this.title}</h2>
          </div>
        ` : ''}
        <div class="modal-body">
          ${this.content}
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    if (!this.modal) return;

    // Close button
    const closeBtn = this.modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    if (this.backdrop) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.close();
        }
      });
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    if (!this.modal) this.create();
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
    
    // Focus management
    const firstFocusable = this.modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }
    
    this.onOpen();
  }

  close() {
    if (!this.modal) return;
    
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.isOpen = false;
    
    this.onClose();
  }

  setContent(content) {
    if (!this.modal) this.create();
    
    const modalBody = this.modal.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerHTML = content;
    }
  }

  setTitle(title) {
    if (!this.modal) this.create();
    
    const modalHeader = this.modal.querySelector('.modal-header h2');
    if (modalHeader) {
      modalHeader.textContent = title;
    }
  }

  destroy() {
    if (this.modal) {
      this.close();
      document.body.removeChild(this.modal);
      this.modal = null;
    }
  }
}

export default Modal;