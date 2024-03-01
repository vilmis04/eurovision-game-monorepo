'use client';

import { BaseTextFieldProps, TextField } from '@mui/material';
import { useField } from 'formik';

interface FormTextFieldProps extends BaseTextFieldProps {
  name: string;
  className?: string;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  placeholder,
  className = '',
  ...props
}) => {
  const [field] = useField<string>(name);

  return (
    <TextField
      {...field}
      className={`w-full ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
};
