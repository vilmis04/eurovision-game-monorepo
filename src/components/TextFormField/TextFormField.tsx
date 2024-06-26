import { BaseTextFieldProps, Box, TextField } from '@mui/material';
import { useField } from 'formik';
import { styles } from './TextFormField.styles';
import ErrorIcon from '@mui/icons-material/ErrorOutlineTwoTone';

interface TextFormFieldProps extends BaseTextFieldProps {
  name: string;
  endAdornment?: React.ReactNode;
}

export const TextFormField: React.FC<TextFormFieldProps> = ({
  name,
  endAdornment,
  ...props
}) => {
  const [field, { error, touched }] = useField(name);
  const isError = Boolean(error) && touched;
  const errorMessage = (
    <Box component="span" sx={styles.errorContainer}>
      {isError && (
        <>
          <ErrorIcon sx={styles.icon} />
          {error}
        </>
      )}
    </Box>
  );

  return (
    <TextField
      {...field}
      helperText={errorMessage}
      variant="standard"
      InputLabelProps={{ sx: styles.label, shrink: true }}
      inputProps={{ sx: styles.input }}
      InputProps={{
        endAdornment: endAdornment,
      }}
      {...props}
    />
  );
};
