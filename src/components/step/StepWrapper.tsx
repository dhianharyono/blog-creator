import React, { FC, Fragment, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { GrNext } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';

interface StepWrapperProps {
  step: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
  children: ReactNode;
}

const STEP_NAMES = [
  'Metadata',
  'Summary & Category',
  'Content',
  'Review & Submit',
];

export const StepWrapper: FC<StepWrapperProps> = ({
  step,
  totalSteps,
  isFirstStep,
  isLastStep,
  onNext,
  onBack,
  children,
}) => {
  const renderStepper = () => (
    <div className='mb-8 overflow-x-auto'>
      <div className='flex justify-between items-start min-w-[400px] sm:min-w-0 sm:w-full'>
        {[...Array(totalSteps)].map((_, index) => {
          const stepIndex = index + 1;
          const isCompleted = stepIndex < step;
          const isActive = stepIndex === step;

          let circleClasses =
            'w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold transition-all duration-300 flex-shrink-0';
          let nameClasses =
            'text-xs mt-2 text-center transition-colors duration-300 w-[70px] sm:w-[80px]';

          if (isCompleted) {
            circleClasses += ' bg-green-500';
            nameClasses += ' text-green-600';
          } else if (isActive) {
            circleClasses += ' bg-blue-600 shadow-md shadow-blue-300';
            nameClasses += ' text-blue-700 font-bold';
          } else {
            circleClasses += ' bg-gray-300 text-gray-600';
            nameClasses += ' text-gray-500';
          }

          return (
            <Fragment key={stepIndex}>
              <div className='flex flex-col items-center flex-shrink-0'>
                <div className={circleClasses}>
                  {isCompleted ? '✓' : stepIndex}
                </div>
                <p className={nameClasses}>{STEP_NAMES[index]}</p>
              </div>
              {stepIndex < totalSteps && (
                <div
                  className='flex-1 self-center h-[2px] mx-2 transition-colors duration-300'
                  style={{
                    backgroundColor: isCompleted ? '#34D399' : '#D1D5DB',
                  }}
                ></div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className='border border-gray-200 rounded-lg shadow-lg bg-white p-4 sm:p-10'>
      {renderStepper()}

      <h2 className='text-xl font-semibold mb-6 text-gray-800'>
        {STEP_NAMES[step - 1]}
      </h2>

      {children}

      <div className='flex justify-between mt-8 pt-4 border-t border-gray-200'>
        {!isFirstStep && (
          <Button
            variant='back'
            onClick={onBack}
            type='button'
            className='!px-0'
            iconLeft={<IoIosArrowBack />}
          >
            Back
          </Button>
        )}

        <div className={isFirstStep ? 'w-full flex justify-end' : ''}>
          {!isLastStep ? (
            <Button
              variant='primary'
              onClick={onNext}
              type='button'
              iconRight={<GrNext />}
            >
              Next Step
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
