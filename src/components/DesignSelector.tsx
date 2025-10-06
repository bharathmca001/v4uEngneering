import React, { useState } from 'react';
import { ChevronDown, Palette } from 'lucide-react';

export type DesignVariant = 'design1' | 'design2' | 'design3';

interface DesignOption {
  id: DesignVariant;
  name: string;
  description: string;
  preview: string;
}

interface DesignSelectorProps {
  currentDesign: DesignVariant;
  onChange: (design: DesignVariant) => void;
}

const designOptions: DesignOption[] = [
  {
    id: 'design1',
    name: 'Professional',
    description: 'Clean and modern business design',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'design2',
    name: 'Corporate',
    description: 'Traditional corporate style',
    preview: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
  },
  {
    id: 'design3',
    name: 'Creative',
    description: 'Bold and innovative design',
    preview: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
  }
];

export const DesignSelector: React.FC<DesignSelectorProps> = ({ currentDesign, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = designOptions.find(opt => opt.id === currentDesign) || designOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        aria-label="Select design variant"
      >
        <Palette className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        <span className="font-medium text-gray-700 dark:text-gray-200">
          {selectedOption.name}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Choose Design
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select your preferred layout
              </p>
            </div>
            <div className="p-2">
              {designOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    currentDesign === option.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500'
                      : 'border-2 border-transparent'
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-lg shadow-inner"
                    style={{ background: option.preview }}
                  />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {option.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {option.description}
                    </div>
                  </div>
                  {currentDesign === option.id && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
