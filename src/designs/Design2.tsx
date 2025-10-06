import React, { useState } from 'react';
import {
  Menu,
  X,
  Building2,
  Calculator,
  Bot,
  TrendingUp,
  Wrench,
  Handshake,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { ServiceModal } from '../components/ServiceModal';
import { DesignSelector, DesignVariant } from '../components/DesignSelector';
import { serviceDetails } from '../data/services';
import { ServiceData } from '../types';

interface Design2Props {
  onDesignChange: (design: DesignVariant) => void;
}

export const Design2: React.FC<Design2Props> = ({ onDesignChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openServiceModal = (serviceId: string) => {
    const service = serviceDetails[serviceId];
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  const services = [
    { id: 'steel-detailing', icon: Building2, title: 'Steel Detailing' },
    { id: 'structural-analysis', icon: Calculator, title: 'Structural Analysis' },
    { id: 'ai-solutions', icon: Bot, title: 'AI Solutions' },
    { id: 'project-management', icon: TrendingUp, title: 'Project Management' },
    { id: 'cad-services', icon: Wrench, title: 'CAD Services' },
    { id: 'consulting', icon: Handshake, title: 'Consulting' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-bold">V4U Engineering</div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="hover:text-blue-300 transition-colors font-medium">Services</a>
              <a href="#about" className="hover:text-blue-300 transition-colors font-medium">About</a>
              <a href="#contact" className="hover:text-blue-300 transition-colors font-medium">Contact</a>
              <DesignSelector currentDesign="design2" onChange={onDesignChange} />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 border-t border-blue-700">
            <div className="px-4 py-4 space-y-3">
              <a href="#services" className="block py-2 hover:text-blue-300">Services</a>
              <a href="#about" className="block py-2 hover:text-blue-300">About</a>
              <a href="#contact" className="block py-2 hover:text-blue-300">Contact</a>
              <div className="pt-2">
                <DesignSelector currentDesign="design2" onChange={onDesignChange} />
              </div>
            </div>
          </div>
        )}
      </nav>

      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-6">
              Professional Engineering Solutions
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Trusted by industry leaders for precision steel detailing and comprehensive engineering services.
            </p>
            <div className="flex gap-4">
              <a
                href="#services"
                className="px-8 py-4 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Our Services
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors border-2 border-white"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Engineering Services
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer bg-white dark:bg-gray-800"
                  onClick={() => openServiceModal(service.id)}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Professional {service.title.toLowerCase()} services tailored to your needs.
                  </p>
                  <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Industry Leading Expertise
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                V4U Engineering delivers professional engineering solutions backed by decades of experience and cutting-edge technology.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Certified Professionals</div>
                    <div className="text-gray-600 dark:text-gray-300">Experienced engineering team</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Quality Assurance</div>
                    <div className="text-gray-600 dark:text-gray-300">ISO certified processes</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    ✓
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">On-Time Delivery</div>
                    <div className="text-gray-600 dark:text-gray-300">98% project completion rate</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Completed Projects</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Years Experience</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Expert Engineers</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">99%</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Contact Our Team
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
              <p className="text-gray-600 dark:text-gray-300">Mon-Fri, 8AM-6PM</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">info@v4uengineering.com</p>
              <p className="text-gray-600 dark:text-gray-300">24/7 Support</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Location</h3>
              <p className="text-gray-600 dark:text-gray-300">Engineering District</p>
              <p className="text-gray-600 dark:text-gray-300">Business Park</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 V4U Engineering. All rights reserved.</p>
        </div>
      </footer>

      <ServiceModal
        isOpen={isModalOpen}
        service={selectedService}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
