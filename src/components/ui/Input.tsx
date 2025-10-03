import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showCharCount?: boolean;
  minLength?: number;
}

export const Input = ({
  label,
  id,
  error,
  className = '',
  showCharCount = false,
  minLength,
  value,
  ...props
}: InputProps) => {
  const inputId = id || props.name;

  const currentValue = String(value || '');
  const currentLength = currentValue.length;

  const counterColor =
    minLength && currentLength < minLength
      ? 'text-red-500 font-semibold'
      : 'text-gray-500';

  return (
    <div className='mb-4'>
      <label
        htmlFor={inputId}
        className='block text-sm font-medium text-gray-700 mb-1'
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
          error ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
        } ${className}`}
        value={value}
        {...props}
      />

      <div className='flex justify-between items-center mt-1'>
        {error && <p className='text-xs text-red-500'>{error}</p>}
        {showCharCount && (
          <p className={`text-xs ml-auto ${counterColor}`}>
            {currentLength} character
            {minLength ? ` (Min: ${minLength})` : ''}
          </p>
        )}
      </div>
    </div>
  );
};
