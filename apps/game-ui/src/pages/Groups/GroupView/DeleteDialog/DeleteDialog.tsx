import { Box, Button, Dialog, DialogProps, Typography } from '@mui/material';
import { styles } from './DeleteDialog.styles';

interface DeleteDialogProps extends DialogProps {
  deleteGroup: () => void;
  handleClose: () => void;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open: isOpen,
  deleteGroup,
  handleClose,
}) => (
  <Dialog open={isOpen} onClose={handleClose} sx={styles.dialog}>
    <Box sx={styles.textWrapper}>
      <Typography variant="body1" sx={[styles.text, styles.title]}>
        Delete group?
      </Typography>
      <Typography variant="body1" sx={[styles.text, styles.mainText]}>
        You won't be able to recover the group once it's deleted.
      </Typography>
    </Box>
    <Box sx={styles.buttonWrapper}>
      <Button onClick={handleClose} sx={[styles.button, styles.leftButton]}>
        <Typography variant="body1" sx={styles.buttonLabel}>
          Cancel
        </Typography>
      </Button>
      <Button onClick={deleteGroup} sx={styles.button}>
        <Typography
          variant="body1"
          sx={[styles.buttonLabel, styles.buttonLabelStrong]}
        >
          Delete
        </Typography>
      </Button>
    </Box>
  </Dialog>
);
