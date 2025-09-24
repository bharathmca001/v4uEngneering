/**
 * Service Management Component
 */
import Modal from './Modal.js';

class ServiceManager {
  constructor() {
    this.services = this.getServicesData();
    this.modal = null;
    this.init();
  }

  init() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    this.modal = new Modal({
      id: 'service-modal',
      size: 'large',
      className: 'service-modal',
      onClose: () => {
        // Analytics or cleanup if needed
      }
    });
  }

  bindEvents() {
    // Service card clicks
    document.addEventListener('click', (e) => {
      const serviceCard = e.target.closest('.service-card');
      if (serviceCard) {
        const serviceId = serviceCard.dataset.service;
        if (serviceId) {
          this.openServiceDetail(serviceId);
        }
      }

      // Learn more button clicks
      const learnMoreBtn = e.target.closest('.learn-more-btn');
      if (learnMoreBtn) {
        e.stopPropagation();
        const serviceCard = learnMoreBtn.closest('.service-card');
        const serviceId = serviceCard?.dataset.service;
        if (serviceId) {
          this.openServiceDetail(serviceId);
        }
      }
    });
  }

  openServiceDetail(serviceId) {
    const service = this.services[serviceId];
    if (!service) {
      console.error(`Service not found: ${serviceId}`);
      return;
    }

    this.modal.setTitle(service.title);
    this.modal.setContent(this.generateServiceContent(service));
    this.modal.open();
  }

  generateServiceContent(service) {
    const sectionsHTML = Object.entries(service.sections).map(([title, items]) => `
      <div class="service-detail-section">
        <h3><i class="fas fa-cog"></i> ${title}</h3>
        <ul class="service-detail-list">
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <div class="service-detail-header">
        <h2>${service.title}</h2>
        <p>${service.description}</p>
      </div>
      
      <div class="service-detail-grid">
        ${sectionsHTML}
      </div>
      
      <div class="service-cta">
        <h3>${service.cta.title}</h3>
        <p>${service.cta.description}</p>
        <button class="btn btn-primary" onclick="document.querySelector('#contact').scrollIntoView({behavior: 'smooth'}); document.getElementById('service-modal').classList.remove('active'); document.body.style.overflow = '';">
          ${service.cta.buttonText}
        </button>
      </div>
    `;
  }

  getServicesData() {
    return {
      'steel-detailing': {
        title: 'Steel Detailing Services',
        description: 'Comprehensive steel detailing solutions for complex structural projects',
        sections: {
          'What We Offer': [
            '3D Structural Modeling using Tekla Structures',
            'Detailed Connection Design and Analysis',
            'Material Take-offs and Bill of Materials',
            'Shop Drawings and Erection Drawings',
            'Clash Detection and Resolution',
            'Code Compliance Verification'
          ],
          'Industries Served': [
            'Commercial Buildings and High-rises',
            'Industrial Facilities and Plants',
            'Infrastructure and Bridges',
            'Residential Complexes',
            'Sports Facilities and Stadiums',
            'Healthcare and Educational Buildings'
          ],
          'Software Expertise': [
            'Tekla Structures for 3D Modeling',
            'AutoCAD for 2D Drafting',
            'Revit for BIM Integration',
            'STAAD Pro for Analysis',
            'Navisworks for Coordination',
            'SketchUp for Visualization'
          ],
          'Deliverables': [
            'GA Drawings (General Arrangement)',
            'Assembly and Detail Drawings',
            'Erection Drawings and Sequences',
            'Material Lists and Schedules',
            'Connection Details and Specifications',
            'Quality Control Reports'
          ]
        },
        cta: {
          title: 'Ready to Start Your Steel Detailing Project?',
          description: 'Get a free consultation and quote for your steel detailing requirements.',
          buttonText: 'Get Free Quote'
        }
      },
      'structural-analysis': {
        title: 'Structural Analysis & Design',
        description: 'Advanced structural analysis and design services for safe and efficient structures',
        sections: {
          'Analysis Services': [
            'Static and Dynamic Analysis',
            'Seismic Design and Assessment',
            'Wind Load Analysis',
            'Foundation Design and Analysis',
            'Retrofitting and Strengthening',
            'Performance-Based Design'
          ],
          'Design Standards': [
            'AISC Steel Construction Manual',
            'ACI Concrete Building Code',
            'ASCE 7 Load Standards',
            'IBC International Building Code',
            'Local Building Codes',
            'International Standards (Eurocode, IS)'
          ],
          'Software Tools': [
            'ETABS for Building Analysis',
            'SAP2000 for Complex Structures',
            'SAFE for Foundation Design',
            'PERFORM-3D for Seismic Analysis',
            'RAM Structural System',
            'RISA for Steel Design'
          ],
          'Project Types': [
            'High-rise Buildings',
            'Industrial Structures',
            'Bridge and Infrastructure',
            'Seismic Retrofitting',
            'Foundation Systems',
            'Special Structures'
          ]
        },
        cta: {
          title: 'Need Structural Analysis Services?',
          description: 'Our expert engineers are ready to analyze and design your structure.',
          buttonText: 'Discuss Your Project'
        }
      },
      'ai-solutions': {
        title: 'AI-Powered Engineering Solutions',
        description: 'Cutting-edge artificial intelligence solutions to revolutionize engineering workflows',
        sections: {
          'AI Applications': [
            'Automated Steel Connection Design',
            'Intelligent Drawing Generation',
            'Quality Assurance and Error Detection',
            'Design Optimization Algorithms',
            'Predictive Maintenance Systems',
            'Cost Estimation and Planning'
          ],
          'Machine Learning': [
            'Pattern Recognition in Drawings',
            'Structural Health Monitoring',
            'Load Prediction Models',
            'Material Optimization',
            'Risk Assessment Algorithms',
            'Performance Prediction'
          ],
          'Automation Tools': [
            'Automated Detailing Workflows',
            'Batch Processing Systems',
            'Report Generation',
            'Drawing Standardization',
            'Model Validation',
            'Documentation Management'
          ],
          'Benefits': [
            'Reduced Design Time by 40-60%',
            'Improved Accuracy and Quality',
            'Cost Savings through Optimization',
            'Enhanced Project Delivery',
            'Standardized Processes',
            'Scalable Solutions'
          ]
        },
        cta: {
          title: 'Transform Your Engineering Workflow',
          description: 'Discover how AI can revolutionize your engineering processes.',
          buttonText: 'Learn More About AI'
        }
      },
      'project-management': {
        title: 'Engineering Project Management',
        description: 'Complete project lifecycle management for engineering projects',
        sections: {
          'Management Services': [
            'Project Planning and Scheduling',
            'Resource Allocation and Management',
            'Quality Control and Assurance',
            'Risk Management and Mitigation',
            'Progress Monitoring and Reporting',
            'Stakeholder Communication'
          ],
          'Project Phases': [
            'Conceptual Design and Planning',
            'Detailed Design Development',
            'Construction Documentation',
            'Construction Administration',
            'Quality Inspection',
            'Project Closeout'
          ],
          'Tools & Methodologies': [
            'Microsoft Project for Scheduling',
            'Primavera P6 for Large Projects',
            'Agile Project Management',
            'Lean Construction Principles',
            'BIM Coordination',
            'Digital Project Delivery'
          ],
          'Key Deliverables': [
            'Project Execution Plans',
            'Progress Reports and Dashboards',
            'Quality Control Checklists',
            'Risk Registers and Mitigation Plans',
            'Change Management Procedures',
            'Project Documentation'
          ]
        },
        cta: {
          title: 'Need Expert Project Management?',
          description: 'Let our experienced team manage your engineering project from start to finish.',
          buttonText: 'Start Your Project'
        }
      },
      'cad-services': {
        title: 'CAD Design Services',
        description: 'Professional CAD drafting and design services for all engineering disciplines',
        sections: {
          'CAD Services': [
            '2D Technical Drawings',
            '3D Modeling and Visualization',
            'As-Built Drawings',
            'Conversion Services (PDF to CAD)',
            'Drawing Standardization',
            'CAD Template Development'
          ],
          'Software Proficiency': [
            'AutoCAD for 2D Drafting',
            'Inventor for 3D Mechanical Design',
            'SolidWorks for Product Design',
            'Fusion 360 for Integrated CAD/CAM',
            'SketchUp for Architectural Visualization',
            'Rhino for Complex Geometry'
          ],
          'Drawing Types': [
            'Architectural Plans and Elevations',
            'Structural Drawings and Details',
            'Mechanical System Layouts',
            'Electrical Schematics',
            'Piping and Instrumentation Diagrams',
            'Site Plans and Surveys'
          ],
          'Quality Standards': [
            'Industry Standard Compliance',
            'Layer Management Systems',
            'Consistent Annotation Standards',
            'Proper Dimensioning Practices',
            'Title Block Standardization',
            'File Organization Protocols'
          ]
        },
        cta: {
          title: 'Need Professional CAD Services?',
          description: 'Get accurate, detailed CAD drawings for your project requirements.',
          buttonText: 'Request CAD Quote'
        }
      },
      'consulting': {
        title: 'Engineering Consulting Services',
        description: 'Expert engineering consultation for complex technical challenges',
        sections: {
          'Consulting Areas': [
            'Structural Engineering Consultation',
            'Code Compliance Review',
            'Design Optimization Studies',
            'Feasibility Studies',
            'Technical Due Diligence',
            'Expert Witness Services'
          ],
          'Specialized Services': [
            'Seismic Risk Assessment',
            'Building Performance Evaluation',
            'Structural Health Monitoring',
            'Failure Analysis Investigation',
            'Retrofit and Rehabilitation',
            'Sustainability Consulting'
          ],
          'Industry Expertise': [
            'Commercial and Residential Buildings',
            'Industrial and Manufacturing',
            'Infrastructure and Transportation',
            'Energy and Power Generation',
            'Healthcare and Education',
            'Government and Public Works'
          ],
          'Consultation Process': [
            'Initial Project Assessment',
            'Technical Requirements Analysis',
            'Solution Development',
            'Implementation Planning',
            'Progress Monitoring',
            'Final Recommendations'
          ]
        },
        cta: {
          title: 'Get Expert Engineering Advice',
          description: 'Schedule a consultation with our experienced engineering professionals.',
          buttonText: 'Schedule Consultation'
        }
      }
    };
  }

  // Public methods
  getService(serviceId) {
    return this.services[serviceId];
  }

  getAllServices() {
    return this.services;
  }

  addService(serviceId, serviceData) {
    this.services[serviceId] = serviceData;
  }
}

export default ServiceManager;