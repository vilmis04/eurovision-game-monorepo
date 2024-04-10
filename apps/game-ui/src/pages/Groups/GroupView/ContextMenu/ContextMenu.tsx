import { ContentCopy, DeleteOutline, Logout } from '@mui/icons-material';
import { Menu, MenuItem, MenuProps, Typography } from '@mui/material';
import { styles } from './ContextMenu.styles';
import { useLogoutMutation } from '../../../../api/auth/authApi';
import { useEffect } from 'react';

interface ContextMenuProps extends MenuProps {
  copyLink: () => void;
  deleteGroup: () => void;
  isOwner: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  anchorEl,
  open: isOpen,
  onClose,
  copyLink,
  deleteGroup,
  isOwner,
}) => {
  const [logout, { isSuccess: isLogoutSuccess }] = useLogoutMutation();

  useEffect(() => {
    if (isLogoutSuccess) {
      window.location.reload();
    }
  }, [isLogoutSuccess]);

  const handleCopyLink = () => {
    copyLink();
    onClose?.({}, 'escapeKeyDown');
  };

  const handleDeleteGroup = () => {
    deleteGroup();
    onClose?.({}, 'escapeKeyDown');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose} sx={styles.menu}>
      {isOwner && (
        <>
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
        </>
      )}
      <MenuItem onClick={handleLogout}>
        <Typography variant="body1" sx={[styles.row, styles.copy]}>
          <Logout /> Logout
        </Typography>
      </MenuItem>
    </Menu>
  );
};
