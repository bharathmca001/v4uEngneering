/**
 * Reusable Card Component
 */
class Card {
  constructor(options = {}) {
    this.type = options.type || 'default';
    this.title = options.title || '';
    this.description = options.description || '';
    this.icon = options.icon || '';
    this.features = options.features || [];
    this.buttonText = options.buttonText || 'Learn More';
    this.onClick = options.onClick || (() => {});
    this.className = options.className || '';
    this.animationDelay = options.animationDelay || 0;
  }

  render() {
    const card = document.createElement('div');
    card.className = `card ${this.type}-card ${this.className}`;
    card.style.animationDelay = `${this.animationDelay}s`;
    
    card.innerHTML = this.getCardHTML();
    this.attachEventListeners(card);
    
    return card;
  }

  getCardHTML() {
    switch (this.type) {
      case 'service':
        return this.getServiceCardHTML();
      case 'project':
        return this.getProjectCardHTML();
      case 'hero':
        return this.getHeroCardHTML();
      case 'stat':
        return this.getStatCardHTML();
      default:
        return this.getDefaultCardHTML();
    }
  }

  getServiceCardHTML() {
    const featuresHTML = this.features.map(feature => 
      `<li><i class="fas fa-check"></i>${feature}</li>`
    ).join('');

    return `
      <div class="card-icon">
        <i class="${this.icon}"></i>
      </div>
      <h3>${this.title}</h3>
      <p>${this.description}</p>
      ${this.features.length ? `<ul class="card-features">${featuresHTML}</ul>` : ''}
      <button class="btn btn-outline card-button">${this.buttonText}</button>
    `;
  }

  getProjectCardHTML() {
    return `
      <div class="project-image">
        <img src="${this.image}" alt="${this.title}" loading="lazy" />
        <div class="project-overlay">
          <div class="project-info">
            <h4>${this.title}</h4>
            <p>${this.description}</p>
          </div>
        </div>
      </div>
      <div class="project-content">
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <div class="project-tags">
          ${this.tags ? this.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
        </div>
      </div>
    `;
  }

  getHeroCardHTML() {
    return `
      <div class="card-icon">
        <i class="${this.icon}"></i>
      </div>
      <h3>${this.title}</h3>
      <p>${this.description}</p>
    `;
  }

  getStatCardHTML() {
    return `
      <div class="stat-number" data-target="${this.value}">${this.value}</div>
      <div class="stat-label">${this.title}</div>
    `;
  }

  getDefaultCardHTML() {
    return `
      <div class="card-content">
        ${this.icon ? `<div class="card-icon"><i class="${this.icon}"></i></div>` : ''}
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        ${this.buttonText ? `<button class="btn btn-outline card-button">${this.buttonText}</button>` : ''}
      </div>
    `;
  }

  attachEventListeners(card) {
    const button = card.querySelector('.card-button');
    if (button) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.onClick(this);
      });
    }

    // Make entire card clickable for service cards
    if (this.type === 'service') {
      card.addEventListener('click', () => {
        this.onClick(this);
      });
      card.style.cursor = 'pointer';
    }
  }
}

export default Card;