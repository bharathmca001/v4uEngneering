import React, { useState, useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { serviceDetails, servicesData, projectsData, statsData, ServiceDetail } from './data';

function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('v4u-theme') || 'light';
  });
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('v4u-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const openServiceModal = (serviceId: string) => {
    const service = serviceDetails[serviceId];
    if (service) {
      setActiveService(service);
      setShowServiceModal(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
    setActiveService(null);
    document.body.style.overflow = '';
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    const originalText = submitBtn.textContent;

    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    await new Promise(resolve => setTimeout(resolve, 2000));

    submitBtn.textContent = originalText || '';
    submitBtn.disabled = false;
    form.reset();

    alert('Thank you! Your message has been sent successfully.');
  };

  return (
    <div className="min-h-screen">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h2>V4U Engineering</h2>
          </div>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#services" className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
            </li>
            <li className="nav-item">
              <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            </li>
            <li className="nav-item theme-switcher">
              <button className="theme-btn" onClick={() => setShowThemeModal(!showThemeModal)}>
                <i className="fas fa-palette"></i>
              </button>
            </li>
          </ul>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {showThemeModal && (
        <div className="theme-modal active">
          <div className="theme-options">
            <button className={`theme-option ${theme === 'light' ? 'active' : ''}`} onClick={() => { setTheme('light'); setShowThemeModal(false); }}>
              <div className="theme-preview light-preview"></div>
              <span>Light</span>
            </button>
            <button className={`theme-option ${theme === 'dark' ? 'active' : ''}`} onClick={() => { setTheme('dark'); setShowThemeModal(false); }}>
              <div className="theme-preview dark-preview"></div>
              <span>Dark</span>
            </button>
            <button className={`theme-option ${theme === 'blue' ? 'active' : ''}`} onClick={() => { setTheme('blue'); setShowThemeModal(false); }}>
              <div className="theme-preview blue-preview"></div>
              <span>Professional</span>
            </button>
          </div>
        </div>
      )}

      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-line">Engineering Excellence</span>
              <span className="title-line">Steel Detailing Solutions</span>
            </h1>
            <p className="hero-description">
              Precision-driven steel detailing and engineering services powered by cutting-edge technology
              and decades of industry expertise.
            </p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('services')} className="btn btn-primary">Our Services</button>
              <button onClick={() => scrollToSection('contact')} className="btn btn-secondary">Get Quote</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-icon">
                <i className="fas fa-drafting-compass"></i>
              </div>
              <h3>Precision Design</h3>
              <p>Advanced CAD solutions for complex structures</p>
            </div>
            <div className="hero-card">
              <div className="card-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3>Engineering Analysis</h3>
              <p>Comprehensive structural analysis and optimization</p>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="bg-shape shape-1"></div>
          <div className="bg-shape shape-2"></div>
          <div className="bg-shape shape-3"></div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive engineering solutions tailored to your project needs</p>
          </div>
          <div className="services-grid">
            {servicesData.map((service) => (
              <div key={service.id} className="service-card" data-service={service.id} onClick={() => openServiceModal(service.id)}>
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button className="btn btn-outline learn-more-btn" onClick={(e) => { e.stopPropagation(); openServiceModal(service.id); }}>Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showServiceModal && activeService && (
        <div className="service-modal active" onClick={closeServiceModal}>
          <div className="service-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeServiceModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="service-detail-content">
              <div className="service-detail-header">
                <h2>{activeService.title}</h2>
                <p>{activeService.description}</p>
              </div>

              <div className="service-detail-grid">
                {Object.entries(activeService.sections).map(([title, items]) => (
                  <div key={title} className="service-detail-section">
                    <h3><i className="fas fa-cog"></i> {title}</h3>
                    <ul className="service-detail-list">
                      {items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="service-cta">
                <h3>{activeService.cta.title}</h3>
                <p>{activeService.cta.description}</p>
                <button className="btn btn-primary" onClick={() => { closeServiceModal(); scrollToSection('contact'); }}>
                  {activeService.cta.buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <div className="section-header">
                <h2>About V4U Engineering</h2>
                <p>Excellence in Engineering Solutions</p>
              </div>
              <div className="about-description">
                <p>
                  V4U Engineering is a leading provider of steel detailing and engineering solutions,
                  combining traditional engineering expertise with cutting-edge technology. Our team of
                  experienced professionals delivers precision-driven solutions for complex structural projects.
                </p>
                <p>
                  With a focus on innovation and quality, we leverage advanced CAD technologies and
                  AI-powered tools to streamline the design process while maintaining the highest
                  standards of accuracy and compliance.
                </p>
              </div>
              <div className="about-stats">
                {statsData.map((stat, idx) => (
                  <div key={idx} className="stat-item">
                    <div className="stat-number">{stat.value}</div>
                    <div className="stat-label">{stat.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-visual">
              <div className="about-image">
                <img src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Engineering Team" />
              </div>
              <div className="experience-badge">
                <div className="badge-content">
                  <span className="badge-number">15+</span>
                  <span className="badge-text">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p>Showcasing our expertise across diverse engineering challenges</p>
          </div>
          <div className="projects-grid">
            {projectsData.map((project, idx) => (
              <div key={idx} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-info">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <div className="section-header">
                <h2>Get In Touch</h2>
                <p>Ready to start your next engineering project?</p>
              </div>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Office Location</h4>
                    <p>Engineering District, Business Park<br />Suite 401, Tech Tower</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567<br />+1 (555) 123-4568</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h4>Email</h4>
                    <p>info@v4uengineering.com<br />projects@v4uengineering.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="required">Full Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="required">Email Address</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input type="text" id="company" name="company" />
                </div>
                <div className="form-group">
                  <label htmlFor="service" className="required">Service Required</label>
                  <select id="service" name="service" required>
                    <option value="">Select a service</option>
                    <option value="steel-detailing">Steel Detailing</option>
                    <option value="structural-analysis">Structural Analysis</option>
                    <option value="cad-services">CAD Services</option>
                    <option value="consulting">Engineering Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="required">Project Details</label>
                  <textarea id="message" name="message" rows={5} required placeholder="Please describe your project requirements..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>V4U Engineering</h3>
              <p>Your trusted partner for steel detailing and engineering excellence.</p>
              <div className="social-links">
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Steel Detailing</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Structural Analysis</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>CAD Services</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Engineering Consulting</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
                <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <ul>
                <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
                <li><i className="fas fa-envelope"></i> info@v4uengineering.com</li>
                <li><i className="fas fa-map-marker-alt"></i> Engineering District, Business Park</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 V4U Engineering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
