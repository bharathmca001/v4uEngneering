import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { ServiceModal } from '../components/ServiceModal';
import { DesignSelector, DesignVariant } from '../components/DesignSelector';
import { serviceDetails } from '../data/services';
import { ServiceData } from '../types';

interface OriginalDesignProps {
  onDesignChange: (design: DesignVariant) => void;
}

export const OriginalDesign: React.FC<OriginalDesignProps> = ({ onDesignChange }) => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('v4u-theme') || 'light');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('v4u-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const text = target.getAttribute('data-target') || target.textContent || '0';
          const numericValue = parseInt(text.replace(/\D/g, ''));
          const suffix = text.replace(/\d/g, '');

          if (!isNaN(numericValue)) {
            animateCounter(target, 0, numericValue, suffix, 2000);
          }
          counterObserver.unobserve(target);
        }
      });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  const animateCounter = (element: HTMLElement, start: number, end: number, suffix: string, duration: number) => {
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * easeOutQuart(progress));
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  const openServiceModal = (serviceId: string) => {
    const service = serviceDetails[serviceId];
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <style>{`
        [data-theme="light"] {
          --bg-primary: #ffffff;
          --bg-secondary: #f3f4f6;
          --text-primary: #111827;
          --text-secondary: #6b7280;
          --accent: #3b82f6;
        }

        [data-theme="dark"] {
          --bg-primary: #1f2937;
          --bg-secondary: #111827;
          --text-primary: #f9fafb;
          --text-secondary: #d1d5db;
          --accent: #60a5fa;
        }

        [data-theme="blue"] {
          --bg-primary: #eff6ff;
          --bg-secondary: #dbeafe;
          --text-primary: #1e3a8a;
          --text-secondary: #1e40af;
          --accent: #2563eb;
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card {
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>

      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">V4U Engineering</h2>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projects</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>

              <div className="relative">
                <button
                  onClick={() => setIsThemeModalOpen(!isThemeModalOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>

                {isThemeModalOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsThemeModalOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-2">
                        {['light', 'dark', 'blue'].map((t) => (
                          <button
                            key={t}
                            onClick={() => {
                              setTheme(t);
                              setIsThemeModalOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-lg capitalize ${
                              theme === t ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <DesignSelector currentDesign="design1" onChange={onDesignChange} />
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300"></div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block py-2 text-gray-700 dark:text-gray-300">Home</a>
              <a href="#services" className="block py-2 text-gray-700 dark:text-gray-300">Services</a>
              <a href="#about" className="block py-2 text-gray-700 dark:text-gray-300">About</a>
              <a href="#projects" className="block py-2 text-gray-700 dark:text-gray-300">Projects</a>
              <a href="#contact" className="block py-2 text-gray-700 dark:text-gray-300">Contact</a>
              <div className="pt-2 border-t dark:border-gray-700">
                <DesignSelector currentDesign="design1" onChange={onDesignChange} />
              </div>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Engineering Excellence
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
              Steel Detailing Solutions
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Precision-driven steel detailing and engineering services powered by cutting-edge technology and decades of industry expertise.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#services" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Our Services
              </a>
              <a href="#contact" className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-2 border-blue-600">
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Comprehensive engineering solutions tailored to your project needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(serviceDetails).map((serviceId, index) => {
              const service = serviceDetails[serviceId];
              return (
                <div
                  key={serviceId}
                  className="service-card fade-in bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => openServiceModal(serviceId)}
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                    <span className="text-3xl">📋</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300">
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="fade-in">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About V4U Engineering</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                V4U Engineering is a leading provider of steel detailing and engineering solutions, combining traditional engineering expertise with cutting-edge technology.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="stat-number text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2" data-target="500">0</div>
                  <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="stat-number text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2" data-target="15">0</div>
                  <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="stat-number text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2" data-target="50">0</div>
                  <div className="text-gray-600 dark:text-gray-400">Expert Engineers</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                  <div className="stat-number text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2" data-target="99">0</div>
                  <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <img
                src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Engineering"
                className="rounded-xl shadow-2xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Phone</h3>
              <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-300">info@v4uengineering.com</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Location</h3>
              <p className="text-gray-600 dark:text-gray-300">Engineering District</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
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
