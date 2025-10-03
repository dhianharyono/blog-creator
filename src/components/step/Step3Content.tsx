import React from 'react';
import { Textarea } from '../../components/ui/TextArea';
import { WizardFormReturn } from '../../hooks/useWizardForm';

interface Step3Props {
  methods: WizardFormReturn;
}

export const Step3Content = ({ methods }: Step3Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  const contentValue = watch('content');

  return (
    <form className='space-y-4'>
      <Textarea
        label='Blog Content'
        placeholder='Write the full content of your blog post here...'
        showCharCount={true}
        minLength={50}
        rows={15}
        value={contentValue}
        {...register('content')}
        error={errors.content?.message}
      />
    </form>
  );
};
