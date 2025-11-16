import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-light mb-2">{label}</label>
      <input
        id={id}
        className="w-full bg-white/5 backdrop-blur-sm border border-gray-border text-light rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary transition-all duration-300 placeholder:text-gray-light"
        {...props}
      />
    </div>
  );
};

export default Input;