import { z } from 'zod';

export type ValidationRule = {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
};

export type FormValidation<T> = {
  field: keyof T;
  rules: ValidationRule[];
  message?: string;
};

export const createFormSchema = <T extends Record<string, any>>(validations: FormValidation<T>[]) => {
  const schema: Record<string, any> = {};

  validations.forEach(({ field, rules }) => {
    let fieldSchema: any = z.string();

    rules.forEach(rule => {
      switch (rule.type) {
        case 'required':
          fieldSchema = fieldSchema.min(1, { message: rule.message });
          break;
        case 'email':
          fieldSchema = fieldSchema.email({ message: rule.message });
          break;
        case 'minLength':
          fieldSchema = fieldSchema.min(rule.value, { message: rule.message });
          break;
        case 'maxLength':
          fieldSchema = fieldSchema.max(rule.value, { message: rule.message });
          break;
        case 'pattern':
          fieldSchema = fieldSchema.regex(rule.value, { message: rule.message });
          break;
        case 'custom':
          fieldSchema = fieldSchema.refine(rule.value, { message: rule.message });
          break;
      }
    });

    schema[field as string] = fieldSchema;
  });

  return z.object(schema);
};

export const useFormValidation = <T extends Record<string, any>>(validations: FormValidation<T>[]) => {
  const schema = createFormSchema(validations);
  return {
    schema,
    validate: (data: T) => schema.safeParse(data),
    validateField: (field: keyof T, value: any) => 
      schema.pick({ [field]: true }).safeParse({ [field]: value })
  };
};
