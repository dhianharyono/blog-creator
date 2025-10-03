import './globals.css';
import { BlogProvider } from '../context/BlogContext';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blog Creator',
  description: 'A multi-step wizard for creating and managing blog posts.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <BlogProvider>
          <div className='container mx-auto p-4 max-w-4xl'>{children}</div>
        </BlogProvider>
      </body>
    </html>
  );
}
