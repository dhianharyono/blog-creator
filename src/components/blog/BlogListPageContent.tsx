'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBlog } from '../../context/BlogContext';
import { BlogCard } from './BlogCard';
import { Button } from '../ui/Button';
import { IoBookSharp } from 'react-icons/io5';
import { LoadingScreen } from '../ui/LoadingScreen';

export const BlogListPageContent = () => {
  const { posts } = useBlog();
  const totalPosts = posts.length;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 border-b border-gray-200 pb-5'>
        <div>
          <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
            Blog Creator
          </h1>
          <p className='text-md text-gray-500 mt-1'>
            Manage your {totalPosts} posts ready for your audience.
          </p>
        </div>

        <div className='mt-4 sm:mt-0'>
          <Link href='/create' passHref>
            <Button
              variant='primary'
              className='w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow duration-200'
            >
              <span className='mr-1 text-lg leading-none'>+</span> Create New
              Post
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <LoadingScreen />
      ) : totalPosts === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-300 rounded-xl shadow-inner p-20 animate-fadeIn'>
          <IoBookSharp size={50} className='text-indigo-500' />
          <h3 className='mt-4 text-2xl font-semibold text-gray-900'>
            Time to Create!
          </h3>
          <p className='mt-2 text-center text-md text-gray-600 max-w-lg'>
            You haven't published any content yet. Use the button above to
            create your very first blog post.
          </p>
          <div className='mt-6'>
            <Link href='/create' passHref>
              <Button variant='primary'>Start Writing Now</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6'>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
