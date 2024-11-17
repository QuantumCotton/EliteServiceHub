import React from 'react';
import { useZodForm } from '../../hooks/useZodForm';
import { z } from 'zod';
import { useLoadingState } from '../../hooks/useLoadingState';
import { withErrorBoundary } from './ErrorBoundary';

interface FormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => Promise<void> | void;
  defaultValues?: Partial<z.infer<T>>;
  children: (props: {
    register: ReturnType<typeof useZodForm<T>>['register'];
    formState: ReturnType<typeof useZodForm<T>>['formState'];
    handleSubmit: ReturnType<typeof useZodForm<T>>['handleSubmit'];
    isSubmitting: boolean;
    submitError: Error | null;
  }) => React.ReactNode;
}

function FormComponent<T extends z.ZodType>({
  schema,
  onSubmit,
  defaultValues,
  children
}: FormProps<T>) {
  const form = useZodForm(schema, { defaultValues });
  const { isLoading: isSubmitting, error: submitError, withLoading } = useLoadingState();

  const handleSubmit = async (data: z.infer<T>) => {
    await withLoading(Promise.resolve(onSubmit(data)));
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      {children({
        register: form.register,
        formState: form.formState,
        handleSubmit: form.handleSubmit,
        isSubmitting,
        submitError
      })}
    </form>
  );
}

export const Form = withErrorBoundary(FormComponent) as typeof FormComponent;

// Example usage:
/*
<Form
  schema={contactFormSchema}
  onSubmit={async (data) => {
    await submitContactForm(data);
  }}
  defaultValues={{
    name: '',
    email: '',
    phone: '',
    message: ''
  }}
>
  {({ register, formState, isSubmitting, submitError }) => (
    <>
      <input {...register('name')} />
      {formState.errors.name && (
        <span>{formState.errors.name.message}</span>
      )}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {submitError && <div className="error">{submitError.message}</div>}
    </>
  )}
</Form>
*/
