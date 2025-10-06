import React, { useEffect } from 'react';
import { Clock, X } from 'lucide-react';
import { ServiceData } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  service: ServiceData | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, service, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const availableHours = service.sections['Available Hours'];
  const otherSections = Object.entries(service.sections).filter(
    ([title]) => title !== 'Available Hours'
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {service.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {service.description}
            </p>
          </div>

          {availableHours && (
            <div className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-blue-100 dark:border-gray-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Service Hours
                </h3>
              </div>
              <div className="grid gap-3">
                {availableHours.map((hour, index) => {
                  const [day, time] = hour.split(':');
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {day.trim()}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {time?.trim() || ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {otherSections.map(([title, items]) => (
              <div
                key={title}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-3">{service.cta.title}</h3>
            <p className="text-blue-100 mb-6">{service.cta.description}</p>
            <button
              onClick={() => {
                onClose();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {service.cta.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
