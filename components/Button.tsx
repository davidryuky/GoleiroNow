import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-purple-500 text-white hover:shadow-glow-primary focus:ring-primary hover:-translate-y-1',
    secondary: 'bg-white/10 text-white hover:bg-white/20 focus:ring-gray-500 border border-white/20',
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