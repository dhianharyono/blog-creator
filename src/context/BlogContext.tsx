'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from 'react';
import { BlogPost, BlogPostFormData } from '@/types/blog';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (data: BlogPostFormData) => void;
  getPostById: (id: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'myboost_blog_posts';

const loadPostsFromStorage = (): BlogPost[] => {
  if (typeof window !== 'undefined') {
    const json = localStorage.getItem(LOCAL_STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  }
  return [];
};

const savePostsToStorage = (posts: BlogPost[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  }
};

export const BlogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setPosts(loadPostsFromStorage());
  }, []);

  const addPost = (data: BlogPostFormData) => {
    const newPost: BlogPost = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setPosts((prevPosts) => {
      const updatedPosts = [newPost, ...prevPosts];
      savePostsToStorage(updatedPosts);
      return updatedPosts;
    });
  };

  const getPostById = (id: string) => {
    return posts.find((post) => post.id === id);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, getPostById }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
