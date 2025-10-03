import React from 'react';
import { Input } from '@/components/ui/Input';
import { WizardFormReturn } from '../../hooks/useWizardForm';

interface Step1Props {
  methods: WizardFormReturn;
}

export const Step1Metadata = ({ methods }: Step1Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  const titleValue = watch('title');
  const authorValue = watch('author');

  return (
    <form className='space-y-4'>
      <Input
        label='Blog Title'
        placeholder='Enter the title of your blog post'
        showCharCount
        minLength={5}
        value={titleValue}
        {...register('title')}
        error={errors.title?.message}
      />

      <Input
        label='Author Name'
        placeholder='Your name or pen name'
        value={authorValue}
        {...register('author')}
        error={errors.author?.message}
      />
    </form>
  );
};
