import { IoBookSharp } from 'react-icons/io5';

export const LoadingScreen = () => (
  <div className='flex flex-col items-center justify-center min-h-[500px]'>
    <IoBookSharp size={64} className='text-indigo-600 animate-bounce' />
    <p className='mt-4 text-md font-semibold text-gray-700'>
      Loading Blog Posts...
    </p>
  </div>
);
