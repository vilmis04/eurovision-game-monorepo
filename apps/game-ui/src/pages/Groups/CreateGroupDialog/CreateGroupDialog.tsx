import {
  Background,
  SubmitButton,
  TextFormField,
} from '@eurovision-game-monorepo/core-ui';
import { Box, Dialog, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
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

export const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({
  isOpen,
  toggleDialog,
}) => {
  const [createGroup, { isLoading, isSuccess }] = useCreateGroupMutation();

  const handleSubmit = async (values: CreateGroupFormValues) => {
    await createGroup(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toggleDialog();
    }
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onClose={toggleDialog}>
      <Background variant="solid1">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => (
            <Box component={Form} sx={styles.form}>
              <Box sx={styles.topbar}>
                <CloseIcon onClick={toggleDialog} sx={styles.icon} />
              </Box>
              <Typography variant="h1" sx={styles.title}>
                Name your group
              </Typography>
              {/* TODO: add symbol count in the field */}
              <TextFormField name="name" label="Group name" sx={styles.field} />
              {/* TODO: fix button theme to work with different variants */}
              <SubmitButton isLoading={isLoading} isDisabled={!values.name}>
                Save
              </SubmitButton>
            </Box>
          )}
        </Formik>
      </Background>
    </Dialog>
  );
};
