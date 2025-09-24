/**
 * Notification Manager Component
 */
class NotificationManager {
  constructor() {
    this.notifications = [];
    this.container = null;
    this.init();
  }

  init() {
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.className = 'notification-container';
    this.container.id = 'notification-container';
    document.body.appendChild(this.container);
  }

  show(message, type = 'info', duration = 5000, options = {}) {
    const notification = this.createNotification(message, type, options);
    this.container.appendChild(notification);
    this.notifications.push(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        this.remove(notification);
      }, duration);
    }

    return notification;
  }

  createNotification(message, type, options) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };

    notification.innerHTML = `
      <div class="notification-content">
        <i class="${iconMap[type] || iconMap.info}"></i>
        <span class="notification-message">${message}</span>
        ${options.closable !== false ? '<button class="notification-close"><i class="fas fa-times"></i></button>' : ''}
      </div>
      ${options.progress ? '<div class="notification-progress"></div>' : ''}
    `;

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.remove(notification);
      });
    }

    return notification;
  }

  remove(notification) {
    if (!notification || !notification.parentNode) return;

    notification.classList.remove('show');
    notification.classList.add('hide');

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }
    }, 300);
  }

  // Convenience methods
  success(message, duration, options) {
    return this.show(message, 'success', duration, options);
  }

  error(message, duration, options) {
    return this.show(message, 'error', duration, options);
  }

  warning(message, duration, options) {
    return this.show(message, 'warning', duration, options);
  }

  info(message, duration, options) {
    return this.show(message, 'info', duration, options);
  }

  // Clear all notifications
  clear() {
    this.notifications.forEach(notification => {
      this.remove(notification);
    });
  }

  // Get notification count
  getCount() {
    return this.notifications.length;
  }
}

export default NotificationManager;