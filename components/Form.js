/**
 * Form Component with Validation
 */
class Form {
  constructor(formElement, options = {}) {
    this.form = typeof formElement === 'string' 
      ? document.querySelector(formElement) 
      : formElement;
    
    this.options = {
      validateOnInput: true,
      showSuccessMessage: true,
      resetOnSuccess: true,
      submitHandler: null,
      validationRules: {},
      ...options
    };
    
    this.isSubmitting = false;
    this.init();
  }

  init() {
    if (!this.form) {
      console.error('Form element not found');
      return;
    }
    
    this.bindEvents();
    this.setupValidation();
  }

  bindEvents() {
    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Real-time validation
    if (this.options.validateOnInput) {
      const inputs = this.form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    }
  }

  setupValidation() {
    // Add required indicators
    const requiredFields = this.form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      const label = this.form.querySelector(`label[for="${field.id}"]`);
      if (label && !label.classList.contains('required')) {
        label.classList.add('required');
      }
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    const rules = this.options.validationRules[fieldName] || {};
    
    // Clear previous errors
    this.clearFieldError(field);
    
    // Required validation
    if (field.hasAttribute('required') && !value) {
      this.showFieldError(field, 'This field is required');
      return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }
    
    // Custom validation rules
    if (rules.pattern && value) {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(value)) {
        this.showFieldError(field, rules.message || 'Invalid format');
        return false;
      }
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      this.showFieldError(field, `Minimum ${rules.minLength} characters required`);
      return false;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      this.showFieldError(field, `Maximum ${rules.maxLength} characters allowed`);
      return false;
    }
    
    // Custom validator function
    if (rules.validator && typeof rules.validator === 'function') {
      const result = rules.validator(value, field);
      if (result !== true) {
        this.showFieldError(field, result || 'Invalid value');
        return false;
      }
    }
    
    return true;
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  clearAllErrors() {
    const errorFields = this.form.querySelectorAll('.error');
    const errorMessages = this.form.querySelectorAll('.field-error');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
  }

  async handleSubmit() {
    if (this.isSubmitting) return;
    
    // Validate form
    if (!this.validateForm()) {
      this.showMessage('Please correct the errors above', 'error');
      return;
    }
    
    this.isSubmitting = true;
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn?.textContent || 'Submit';
    
    try {
      // Show loading state
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
      }
      
      // Get form data
      const formData = this.getFormData();
      
      // Handle submission
      if (this.options.submitHandler) {
        await this.options.submitHandler(formData);
      } else {
        await this.defaultSubmitHandler(formData);
      }
      
      // Success handling
      if (this.options.showSuccessMessage) {
        this.showMessage('Thank you! Your message has been sent successfully.', 'success');
      }
      
      if (this.options.resetOnSuccess) {
        this.reset();
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Reset button state
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
      this.isSubmitting = false;
    }
  }

  async defaultSubmitHandler(formData) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
  }

  getFormData() {
    const formData = new FormData(this.form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  }

  reset() {
    this.form.reset();
    this.clearAllErrors();
  }

  showMessage(message, type = 'info') {
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // Public methods
  setFieldValue(fieldName, value) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.value = value;
    }
  }

  getFieldValue(fieldName) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    return field ? field.value : null;
  }

  setFieldError(fieldName, message) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      this.showFieldError(field, message);
    }
  }

  disable() {
    const inputs = this.form.querySelectorAll('input, select, textarea, button');
    inputs.forEach(input => {
      input.disabled = true;
    });
  }

  enable() {
    const inputs = this.form.querySelectorAll('input, select, textarea, button');
    inputs.forEach(input => {
      input.disabled = false;
    });
  }
}

export default Form;