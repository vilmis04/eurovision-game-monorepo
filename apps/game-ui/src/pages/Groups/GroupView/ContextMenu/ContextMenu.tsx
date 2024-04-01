import { ContentCopy, DeleteOutline } from '@mui/icons-material';
import { Menu, MenuItem, MenuProps, Typography } from '@mui/material';
import { styles } from './ContextMenu.styles';

interface ContextMenuProps extends MenuProps {
  copyLink: () => void;
  deleteGroup: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorEl,
  open: isOpen,
  onClose,
  copyLink,
  deleteGroup,
}) => {
  const handleCopyLink = () => {
    copyLink();
    onClose?.({}, 'escapeKeyDown');
  };

  const handleDeleteGroup = () => {
    deleteGroup();
    onClose?.({}, 'escapeKeyDown');
  };

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose} sx={styles.menu}>
      <MenuItem onClick={handleCopyLink}>
        <Typography variant="body1" sx={[styles.row, styles.copy]}>
          <ContentCopy />
          Copy invite link
        </Typography>
      </MenuItem>
      <MenuItem onClick={handleDeleteGroup}>
        <Typography variant="body1" sx={[styles.row, styles.delete]}>
          <DeleteOutline /> Delete Group
        </Typography>
      </MenuItem>
    </Menu>
  );
};
