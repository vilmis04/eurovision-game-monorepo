import {
  Background,
  SubmitButton,
  TextFormField,
} from '@eurovision-game-monorepo/core-ui';
import { Box, Dialog, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { useCreateGroupMutation } from '../../../api/group/groupApi';
import { styles } from './CreateGroupDialog.styles';

interface CreateGroupDialogProps {
  isOpen: boolean;
  toggleDialog: () => void;
}

interface CreateGroupFormValues {
  name: string;
}

const initialValues: CreateGroupFormValues = {
  name: '',
};

const MAX_CHARS = 30;

export const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  isOpen,
  toggleDialog,
}) => {
  const [createGroup, { isLoading, isSuccess }] = useCreateGroupMutation();
  const ref = useRef<HTMLElement>();

  const handleSubmit = async (values: CreateGroupFormValues) => {
    await createGroup(values);
  };

  const focusField = () => {
    ref.current?.focus();
  };

  useEffect(() => {
    if (isSuccess) {
      toggleDialog();
    }
  }, [isSuccess]);

  // TODO: fix endAdornment styles (underscore/border color)
  const getEndAdornment = (input: string) => (
    <Typography variant="body1" sx={styles.adornment}>
      {MAX_CHARS - input.length}
    </Typography>
  );

  return (
    <Dialog open={isOpen} onClose={toggleDialog} onFocus={focusField}>
      <Background variant="solid1">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values: { name } }) => (
            <Box component={Form} sx={styles.form}>
              <Box sx={styles.topbar}>
                <CloseIcon onClick={toggleDialog} sx={styles.icon} />
              </Box>
              <Typography variant="h1" sx={styles.title}>
                Name your group
              </Typography>
              <TextFormField
                inputRef={ref}
                name="name"
                label="Group name"
                sx={styles.field}
                endAdornment={getEndAdornment(name)}
              />
              <SubmitButton isLoading={isLoading} variant="outlined">
                Save
              </SubmitButton>
            </Box>
          )}
        </Formik>
      </Background>
    </Dialog>
  );
};
