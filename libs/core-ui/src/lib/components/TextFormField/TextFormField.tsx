import { BaseTextFieldProps, TextField } from '@mui/material';
import { useField } from 'formik';
import { styles } from './TextFormField.styles';

interface TextFormFieldProps extends BaseTextFieldProps {
  name: string;
}

export const TextFormField: React.FC<TextFormFieldProps> = ({
  name,
  ...props
}) => {
  const [field] = useField(name);

  return (
    <TextField
      {...field}
      variant="standard"
      InputLabelProps={{ sx: styles.label }}
      inputProps={{ sx: styles.input }}
      {...props}
    />
  );
};
