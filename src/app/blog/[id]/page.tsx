'use client';

import React from 'react';
import { useBlog } from '../../../context/BlogContext';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { usePathname, notFound } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

export default function BlogDetailPage() {
  const { getPostById } = useBlog();
  const pathname = usePathname();

  const pathSegments = pathname.split('/');
  const postId = pathSegments.length > 2 ? pathSegments[2] : null;

  if (!postId) {
    return notFound();
  }

  const post = getPostById(postId);

  if (!post) {
    return notFound();
  }

  return (
    <div className='p-4 sm:p-6 md:p-10 max-w-4xl mx-auto'>
      <Link href='/'>
        <Button className='!px-0' variant='back' iconLeft={<IoIosArrowBack />}>
          Back to Posts
        </Button>
      </Link>

      <div className='border rounded-lg shadow-lg border-gray-200 p-4 sm:p-6 md:p-10 space-y-6 mt-6 md:mt-10'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 border-b border-gray-200 pb-6 sm:pb-8 lg:pb-10 text-center'>
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h1>

        <div className='text-xs sm:text-sm text-gray-500 flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0 items-start md:items-center border-b border-gray-200 pb-4'>
          <span>
            Oleh:{' '}
            <span className='font-semibold text-gray-700'>{post.author}</span>
          </span>
          <span>
            Kategori:{' '}
            <span className='font-semibold text-blue-600'>{post.category}</span>
          </span>
          <span>
            Dipublikasikan: <span className='font-semibold'>{post.date}</span>
          </span>
        </div>

        <h2 className='text-lg sm:text-xl font-semibold mt-4 text-gray-700'>
          Summary
        </h2>
        <p className='italic text-gray-600 border-l-4 border-gray-200 pl-4 py-2'>
          {post.summary}
        </p>

        <div className='mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6'>
          <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800'>
            Content
          </h2>
          <p className='text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap break-words'>
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
}
