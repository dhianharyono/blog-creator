import React, { FC, useEffect, useState } from 'react';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

interface SuccessToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export const SuccessToast: FC<SuccessToastProps> = ({
  message,
  onClose,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-2xl bg-white border-l-4 border-green-500 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role='alert'
    >
      <div className='flex items-center space-x-3'>
        <IoCheckmarkCircleSharp className='text-green-500 flex-shrink-0 w-6 h-6' />
        <div>
          <p className='text-sm font-semibold text-gray-900'>Success</p>
          <p className='text-sm text-gray-600'>{message}</p>
        </div>
      </div>
    </div>
  );
};
