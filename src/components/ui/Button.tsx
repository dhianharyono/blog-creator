import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'back';
  children: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const getVariantClasses = (variant: 'primary' | 'secondary' | 'back') => {
  switch (variant) {
    case 'primary':
      return 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-150 ease-in-out flex items-center justify-center space-x-2';
    case 'secondary':
      return 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded disabled:opacity-50 transition duration-150 ease-in-out flex items-center justify-center space-x-2';
    case 'back':
      return 'text-gray-600 hover:text-gray-800 py-2 px-4 transition duration-150 ease-in-out flex items-center justify-center space-x-1';
    default:
      return '';
  }
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  iconLeft,
  iconRight,
  ...props
}) => {
  return (
    <button
      className={`${getVariantClasses(variant)} ${className} cursor-pointer`}
      {...props}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
};
