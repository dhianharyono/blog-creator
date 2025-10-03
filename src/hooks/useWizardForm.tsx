'use client';

import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BlogPostFormData, BlogCategory } from '@/types/blog';

const CATEGORIES = ['Tech', 'Lifestyle', 'Business'] as const;

export const Step1Schema = z.object({
  title: z
    .string()
    .min(5, 'Blog Title must be at least 5 characters long')
    .max(100, 'Title is too long'),
  author: z
    .string()
    .min(2, 'Author Name is required')
    .max(50, 'Name is too long'),
});

export const Step2Schema = z.object({
  summary: z
    .string()
    .min(20, 'Summary must be at least 20 characters long')
    .max(350, 'Summary is too long'),

  category: z.enum(CATEGORIES, {
    message: 'Please select a valid Blog Category.',
  }),
});

export const Step3Schema = z.object({
  content: z
    .string()
    .min(50, 'Blog Content must be at least 50 characters long'),
});

export const FullFormSchema = Step1Schema.merge(Step2Schema).merge(Step3Schema);

export type WizardFormReturn = UseFormReturn<BlogPostFormData>;

export const useWizardForm = () => {
  const methods = useForm<BlogPostFormData>({
    resolver: zodResolver(FullFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      author: '',
      summary: '',
      category: CATEGORIES[0] as BlogCategory,
      content: '',
    },
  });

  return methods;
};
