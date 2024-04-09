import {
  Background,
  GradientType,
  SubmitButton,
  TextFormField,
} from '@eurovision-game-monorepo/core-ui';
import { Box, Dialog, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { useCreateGroupMutation } from '../../../api/group/groupApi';
import { styles } from './CreateGroupDialog.styles';
import * as Yup from 'yup';
import ErrorIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../paths';

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
  const navigate = useNavigate();
  const [createGroup, { data: id, isLoading, isSuccess }] =
    useCreateGroupMutation();
  const ref = useRef<HTMLElement>();

  const handleSubmit = async (values: CreateGroupFormValues) => {
    await createGroup(values);
  };

  const createGroupValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .max(30, 'Maximum number of symbols reached'),
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(`${paths.group.build(id)}?isNew=true`);
    }
  }, [isSuccess]);

  const focusOnceFactory = () => {
    let done = false;

    return () => {
      if (!done) {
        ref.current?.focus();
        done = true;
      }
    };
  };

  const getEndAdornment = (input: string) => {
    const charsRemaining = MAX_CHARS - input.length;
    const shouldShowNumber = charsRemaining >= 0;

    return (
      <Typography variant="body1" sx={styles.adornment}>
        {shouldShowNumber ? charsRemaining : <ErrorIcon color="error" />}
      </Typography>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggleDialog}
      disableRestoreFocus
      onFocus={focusOnceFactory()}
    >
      <Background variant={GradientType.SOLID1}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={createGroupValidationSchema}
        >
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
