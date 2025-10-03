import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { MdOutlineNavigateNext } from 'react-icons/md';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${post.id}`}
      className='block border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-150 ease-in-out animate-fadeIn'
    >
      <h2 className='text-xl font-semibold text-blue-500 hover:text-blue-200'>
        {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
      </h2>

      <p className='text-sm text-gray-500 mt-1'>
        By: {post.author} | Category: {post.category} | Date: {post.date}
      </p>

      <p className='mt-2 text-gray-600 line-clamp-2'>{post.summary}</p>
      <span className='flex gap-1 w-fit text-sm text-blue-500 mt-2 items-center hover:text-blue-200 place-self-end'>
        Read More
        <MdOutlineNavigateNext size={20} />
      </span>
    </Link>
  );
};
