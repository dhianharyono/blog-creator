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
  const postId = pathSegments[2];

  if (!postId) {
    return notFound();
  }

  const post = getPostById(postId);

  if (!post) {
    return notFound();
  }

  return (
    <div className='m-10'>
      <Link href='/'>
        <Button className='!px-0' variant='back' iconLeft={<IoIosArrowBack />}>
          Back to Posts
        </Button>
      </Link>

      <div className='border rounded-lg shadow-lg border-gray-200  p-6 space-y-6 mt-10'>
        <h1 className='text-4xl font-extrabold text-gray-900 border-b border-gray-200 pb-10 text-center'>
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h1>

        <div className='text-sm text-gray-500 flex justify-between items-center border-b border-gray-200 pb-4'>
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

        <h2 className='text-xl font-semibold mt-6 text-gray-700'>Summary</h2>
        <p className='italic text-gray-600 border-l-4 border-gray-200 pl-4 py-2'>
          {post.summary}
        </p>

        <div className='mt-8 border-t border-gray-200 pt-6'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Content</h2>
          <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
}
