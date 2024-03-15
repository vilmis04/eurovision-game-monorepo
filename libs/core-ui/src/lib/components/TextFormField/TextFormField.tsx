import { BaseTextFieldProps, TextField } from '@mui/material';
import { useField } from 'formik';

interface TextFormFieldProps extends BaseTextFieldProps {
  name: string;
}

export const TextFormField: React.FC<TextFormFieldProps> = ({ name }) => {
  const [field] = useField(name);

  return <TextField {...field} />;
};
