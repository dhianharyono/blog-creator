import React, { FC } from 'react';
import { BlogPostFormData } from '@/types/blog';
import { Button } from '@/components/ui/Button';

interface Step4Props {
  formData: BlogPostFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const Step4ReviewSubmit = ({
  formData,
  onSubmit,
  isSubmitting,
}: Step4Props) => {
  const { title, author, summary, category, content } = formData;

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm'>
        <ReviewItem label='Title' value={title} />
        <ReviewItem label='Author' value={author} />
        <ReviewItem label='Category' value={category} />
        <ReviewItem label='Summary' value={summary} fullWidth />
      </div>
      <div className='border border-gray-200 p-4 rounded-lg bg-gray-50 max-h-96 overflow-y-auto'>
        <h4 className='font-bold mb-2'>Blog Content:</h4>
        <p className='whitespace-pre-wrap text-gray-700'>{content}</p>
      </div>
      <div className='flex justify-end pt-4 border- border-gray-200'>
        <Button
          variant='primary'
          onClick={onSubmit}
          disabled={isSubmitting}
          type='button'
        >
          {isSubmitting ? 'Submitting...' : 'Submit Blog Post'}
        </Button>
      </div>
    </div>
  );
};

const ReviewItem: FC<{
  label: string;
  value: string;
  fullWidth?: boolean;
}> = ({ label, value, fullWidth = false }) => (
  <div className={fullWidth ? 'md:col-span-2' : ''}>
    <p className='font-medium text-gray-500'>{label}:</p>
    <p className='font-semibold text-gray-800'>{value}</p>
  </div>
);
