export interface ServiceDetail {
  title: string;
  description: string;
  sections: Record<string, string[]>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface ServiceData {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface ProjectData {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface StatData {
  value: string;
  title: string;
}

export const serviceDetails: Record<string, ServiceDetail> = {
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

export const servicesData: ServiceData[] = [
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

export const projectsData: ProjectData[] = [
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

export const statsData: StatData[] = [
  { value: '500+', title: 'Projects Completed' },
  { value: '15+', title: 'Years Experience' },
  { value: '50+', title: 'Expert Engineers' },
  { value: '99%', title: 'Client Satisfaction' }
];
