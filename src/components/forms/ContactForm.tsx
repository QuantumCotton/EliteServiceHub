import React from 'react';
import { Form } from '../common/Form';
import { Input } from '../common/Input';
import { contactFormSchema } from '../../schemas/forms';
import { useApp } from '../../context/AppContext';
import { withErrorBoundary } from '../common/ErrorBoundary';

function ContactFormComponent() {
  const { dispatch } = useApp();

  const handleSubmit = async (data: any) => {
    // TODO: Implement form submission
    console.log('Form submitted:', data);
    // Example dispatch:
    // dispatch({ type: 'UPDATE_CONTACT_FORM', payload: data });
  };

  return (
    <Form
      schema={contactFormSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        name: '',
        email: '',
        phone: '',
        message: '',
      }}
    >
      {({ register, formState: { errors }, isSubmitting, submitError }) => (
        <div className="space-y-6">
          <Input
            {...register('name')}
            label="Name"
            error={errors.name}
            placeholder="John Doe"
          />

          <Input
            {...register('email')}
            label="Email"
            type="email"
            error={errors.email}
            placeholder="john@example.com"
          />

          <Input
            {...register('phone')}
            label="Phone"
            type="tel"
            error={errors.phone}
            placeholder="+1 (555) 123-4567"
          />

          <div className="space-y-1">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              className={`
                block w-full rounded-md border-gray-300 shadow-sm
                focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
                ${errors.message ? 'border-red-300' : ''}
              `}
              placeholder="How can we help you?"
            />
            {errors.message && (
              <p className="text-sm text-red-600" role="alert">
                {errors.message.message}
              </p>
            )}
          </div>

          {submitError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error submitting form
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {submitError.message}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                inline-flex justify-center rounded-md border border-transparent
                bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm
                hover:bg-indigo-700 focus:outline-none focus:ring-2
                focus:ring-indigo-500 focus:ring-offset-2
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      )}
    </Form>
  );
}

export const ContactForm = withErrorBoundary(ContactFormComponent);
