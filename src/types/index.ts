export interface ServiceData {
  title: string;
  description: string;
  sections: Record<string, string[]>;
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface ServiceDetails {
  [key: string]: ServiceData;
}

export interface CardOptions {
  type?: string;
  title?: string;
  description?: string;
  icon?: string;
  features?: string[];
  buttonText?: string;
  onClick?: () => void;
  className?: string;
  animationDelay?: number;
}

export type ThemeType = 'light' | 'dark' | 'blue';

export interface FormValidationRule {
  pattern?: string;
  message?: string;
  minLength?: number;
  maxLength?: number;
  validator?: (value: string, field: HTMLInputElement) => boolean | string;
}

export interface FormOptions {
  validateOnInput?: boolean;
  showSuccessMessage?: boolean;
  resetOnSuccess?: boolean;
  submitHandler?: (data: Record<string, string>) => Promise<void>;
  validationRules?: Record<string, FormValidationRule>;
}

export interface ModalOptions {
  id?: string;
  title?: string;
  content?: string;
  size?: 'small' | 'medium' | 'large';
  closable?: boolean;
  backdrop?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}
