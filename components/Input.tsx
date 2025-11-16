import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        id={id}
        className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-0 focus:border-primary focus:shadow-[0_0_15px_rgba(126,63,242,0.5)] transition-all duration-300"
        {...props}
      />
    </div>
  );
};

export default Input;