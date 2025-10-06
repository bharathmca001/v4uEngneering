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
  Zap,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { ServiceModal } from '../components/ServiceModal';
import { DesignSelector, DesignVariant } from '../components/DesignSelector';
import { serviceDetails } from '../data/services';
import { ServiceData } from '../types';

interface Design3Props {
  onDesignChange: (design: DesignVariant) => void;
}

export const Design3: React.FC<Design3Props> = ({ onDesignChange }) => {
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
    { id: 'steel-detailing', icon: Building2, title: 'Steel Detailing', color: 'from-orange-500 to-red-500' },
    { id: 'structural-analysis', icon: Calculator, title: 'Structural Analysis', color: 'from-yellow-500 to-orange-500' },
    { id: 'ai-solutions', icon: Bot, title: 'AI Solutions', color: 'from-red-500 to-pink-500' },
    { id: 'project-management', icon: TrendingUp, title: 'Project Management', color: 'from-orange-500 to-amber-500' },
    { id: 'cad-services', icon: Wrench, title: 'CAD Services', color: 'from-amber-500 to-yellow-500' },
    { id: 'consulting', icon: Handshake, title: 'Consulting', color: 'from-red-500 to-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-black/50 backdrop-blur-md sticky top-0 z-50 border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-orange-500" />
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                V4U Engineering
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="hover:text-orange-500 transition-colors font-medium">Services</a>
              <a href="#about" className="hover:text-orange-500 transition-colors font-medium">About</a>
              <a href="#contact" className="hover:text-orange-500 transition-colors font-medium">Contact</a>
              <DesignSelector currentDesign="design3" onChange={onDesignChange} />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-orange-500/20">
            <div className="px-4 py-4 space-y-3">
              <a href="#services" className="block py-2">Services</a>
              <a href="#about" className="block py-2">About</a>
              <a href="#contact" className="block py-2">Contact</a>
              <div className="pt-2">
                <DesignSelector currentDesign="design3" onChange={onDesignChange} />
              </div>
            </div>
          </div>
        )}
      </nav>

      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 bg-orange-500/20 border border-orange-500 rounded-full text-orange-500 font-semibold">
              Innovation Meets Engineering
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Bold Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Revolutionary engineering services that push boundaries and deliver exceptional results
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Discover More
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-500 rounded-lg font-bold hover:bg-orange-500 hover:text-white transition-all"
            >
              Start Project
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-center text-gray-400 mb-16">Innovation-driven solutions</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-orange-500 transition-all cursor-pointer overflow-hidden"
                  onClick={() => openServiceModal(service.id)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Next-generation {service.title.toLowerCase()} powered by innovation
                  </p>
                  <div className="flex items-center text-orange-500 font-semibold group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Redefining Engineering
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We don't just follow standards - we set them. V4U Engineering combines bold creativity with technical precision.
              </p>
              <div className="space-y-4">
                {['Award-Winning Team', 'Cutting-Edge Technology', 'Global Reach'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '500+', label: 'Projects', gradient: 'from-orange-500 to-red-500' },
                { value: '15+', label: 'Years', gradient: 'from-yellow-500 to-orange-500' },
                { value: '50+', label: 'Experts', gradient: 'from-red-500 to-pink-500' },
                { value: '99%', label: 'Success', gradient: 'from-orange-500 to-amber-500' }
              ].map((stat, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                  <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-8 text-center">
                    <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-400 mb-16">Ready to start something amazing?</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567', color: 'from-orange-500 to-red-500' },
              { icon: Mail, title: 'Email', info: 'info@v4u.com', color: 'from-yellow-500 to-orange-500' },
              { icon: MapPin, title: 'Location', info: 'Business Park', color: 'from-red-500 to-pink-500' }
            ].map((contact, i) => {
              const Icon = contact.icon;
              return (
                <div key={i} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity`}></div>
                  <div className="relative bg-gray-800 border border-gray-700 rounded-2xl p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{contact.title}</h3>
                    <p className="text-gray-400">{contact.info}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-black py-8 border-t border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 V4U Engineering. Innovating the future.</p>
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
