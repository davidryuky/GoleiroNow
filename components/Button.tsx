import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-dark to-primary text-white shadow-primary-glow hover:shadow-primary-glow-hover focus:ring-primary-light hover:-translate-y-0.5',
    secondary: 'bg-gray-dark text-white hover:bg-gray-700 focus:ring-gray-light border border-gray-border',
    danger: 'bg-gradient-to-r from-red-700 to-red-500 text-white shadow-lg hover:shadow-xl focus:ring-red-400 hover:-translate-y-0.5'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;