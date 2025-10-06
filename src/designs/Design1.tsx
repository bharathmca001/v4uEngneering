import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Building2,
  Calculator,
  Bot,
  TrendingUp,
  Wrench,
  Handshake,
  Mail,
  Phone,
  MapPin,
  Palette
} from 'lucide-react';
import { ServiceModal } from '../components/ServiceModal';
import { DesignSelector, DesignVariant } from '../components/DesignSelector';
import { serviceDetails } from '../data/services';
import { ServiceData } from '../types';

interface Design1Props {
  onDesignChange: (design: DesignVariant) => void;
}

export const Design1: React.FC<Design1Props> = ({ onDesignChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const openServiceModal = (serviceId: string) => {
    const service = serviceDetails[serviceId];
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  const services = [
    { id: 'steel-detailing', icon: Building2, title: 'Steel Detailing', desc: 'Precise 3D modeling and detailed drawings' },
    { id: 'structural-analysis', icon: Calculator, title: 'Structural Analysis', desc: 'Advanced analysis using state-of-the-art software' },
    { id: 'ai-solutions', icon: Bot, title: 'AI Solutions', desc: 'Cutting-edge AI to enhance design processes' },
    { id: 'project-management', icon: TrendingUp, title: 'Project Management', desc: 'Complete lifecycle management' },
    { id: 'cad-services', icon: Wrench, title: 'CAD Services', desc: 'Professional CAD drafting and design' },
    { id: 'consulting', icon: Handshake, title: 'Consulting', desc: 'Expert engineering consultation' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              V4U Engineering
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Contact</a>
              <DesignSelector currentDesign="design1" onChange={onDesignChange} />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <a href="#services" className="block py-2 text-gray-700 dark:text-gray-300">Services</a>
              <a href="#about" className="block py-2 text-gray-700 dark:text-gray-300">About</a>
              <a href="#contact" className="block py-2 text-gray-700 dark:text-gray-300">Contact</a>
              <div className="pt-2">
                <DesignSelector currentDesign="design1" onChange={onDesignChange} />
              </div>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Engineering Excellence
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Precision-driven steel detailing and engineering services powered by cutting-edge technology
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-shadow"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold hover:shadow-xl transition-shadow"
            >
              Get Quote
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="fade-in-section bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => openServiceModal(service.id)}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                About V4U Engineering
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Leading provider of steel detailing and engineering solutions, combining traditional expertise with cutting-edge technology.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-300">Projects</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">15+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-300">Engineers</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">99%</div>
                  <div className="text-gray-600 dark:text-gray-300">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Engineering"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Phone</div>
              <div className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Email</div>
              <div className="text-gray-600 dark:text-gray-300">info@v4u.com</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900 dark:text-white mb-2">Location</div>
              <div className="text-gray-600 dark:text-gray-300">Business Park</div>
            </div>
          </div>
        </div>
      </section>

      <ServiceModal
        isOpen={isModalOpen}
        service={selectedService}
        onClose={() => setIsModalOpen(false)}
      />

      <style>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(20px);
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
