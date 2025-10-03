'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useWizardForm,
  Step1Schema,
  Step2Schema,
  Step3Schema,
} from '../../hooks/useWizardForm';
import { useBlog } from '../../context/BlogContext';
import { WizardStep } from '@/types/blog';

import { StepWrapper } from '@/components/step/StepWrapper';
import { Step1Metadata } from '@/components/step/Step1Metadata';
import { Step2SummaryCategory } from '@/components/step/Step2SummaryCategory';
import { Step3Content } from '@/components/step/Step3Content';
import { Step4ReviewSubmit } from '@/components/step/Step4ReviewSubmit';
import { Button } from '@/components/ui/Button';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

import { SuccessToast } from '../../components/ui/successToast';

const validationSchemas = [Step1Schema, Step2Schema, Step3Schema];

export default function BlogCreationWizardPage() {
  const router = useRouter();
  const { addPost } = useBlog();
  const methods = useWizardForm();

  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const totalSteps: WizardStep = 4;
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  const handleNext = async () => {
    const currentSchema = validationSchemas[currentStep - 1];

    const fieldsToValidate = Object.keys(methods.getValues()).filter((key) =>
      Object.keys(currentSchema.shape).includes(key)
    ) as (keyof typeof methods.getValues)[];

    const isValid = await methods.trigger(fieldsToValidate as any, {
      shouldFocus: true,
    });

    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const handleSubmitPost = methods.handleSubmit(async (data) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    addPost(data);
    setShowSuccessToast(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setShowSuccessToast(false);
      router.push('/');
    }, 2000);
  });

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Metadata methods={methods} />;
      case 2:
        return <Step2SummaryCategory methods={methods} />;
      case 3:
        return <Step3Content methods={methods} />;
      case 4:
        return (
          <Step4ReviewSubmit
            formData={methods.getValues()}
            onSubmit={handleSubmitPost}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return <div>Error: Invalid Step</div>;
    }
  };

  return (
    <div className='space-y-6 px-4 py-10'>
      <Link href='/'>
        <Button className='!px-0' variant='back' iconLeft={<IoIosArrowBack />}>
          Back to Posts
        </Button>
      </Link>
      <div className='animate-fadeIn'>
        <h1 className='text-2xl font-bold place-self-center mt-8 mb-5'>
          Create New Blog Post
        </h1>

        <StepWrapper
          step={currentStep}
          totalSteps={totalSteps}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onNext={handleNext}
          onBack={handleBack}
        >
          {renderStep()}
        </StepWrapper>
      </div>
      {showSuccessToast && (
        <SuccessToast
          message='Your post has been successfully created!'
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </div>
  );
}
