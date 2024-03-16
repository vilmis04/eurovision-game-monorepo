import { BaseTextFieldProps, Box, TextField, Typography } from '@mui/material';
import { useField } from 'formik';
import { styles } from './TextFormField.styles';
import ErrorIcon from '@mui/icons-material/ErrorOutlineTwoTone';

interface TextFormFieldProps extends BaseTextFieldProps {
  name: string;
}

export const TextFormField: React.FC<TextFormFieldProps> = ({
  name,
  ...props
}) => {
  const [field, { error, touched }] = useField(name);
  const isError = Boolean(error) && touched;
  const errorMessage = (
    <Box sx={styles.errorContainer}>
      <ErrorIcon sx={styles.icon} />
      <Typography variant="body1" sx={styles.errorMessage}>
        {error}
      </Typography>
    </Box>
  );
  const helperText = isError && errorMessage;

  return (
    <TextField
      {...field}
      helperText={helperText}
      variant="standard"
      InputLabelProps={{ sx: styles.label }}
      inputProps={{ sx: styles.input }}
      {...props}
    />
  );
};
