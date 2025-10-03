import React from 'react';
import { Textarea } from '../../components/ui/TextArea';
import { WizardFormReturn } from '../../hooks/useWizardForm';
import { BlogCategory } from '@/types/blog';

interface Step2Props {
  methods: WizardFormReturn;
}

const CATEGORIES: BlogCategory[] = ['Tech', 'Lifestyle', 'Business'];

export const Step2SummaryCategory = ({ methods }: Step2Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  const summaryValue = watch('summary');

  return (
    <form className='space-y-4'>
      <Textarea
        label='Blog Summary'
        placeholder='A brief introduction or excerpt for the blog list'
        showCharCount={true}
        minLength={20}
        value={summaryValue}
        {...register('summary')}
        error={errors.summary?.message}
      />

      <div className='mb-4'>
        <label
          htmlFor='category'
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          Blog Category
        </label>
        <select
          id='category'
          className={`w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring ${
            errors.category
              ? 'border-red-500'
              : 'border-gray-300 focus:border-blue-500'
          }`}
          {...register('category')}
        >
          <option value=''>Select a Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className='mt-1 text-xs text-red-500'>{errors.category.message}</p>
        )}
      </div>
    </form>
  );
};
