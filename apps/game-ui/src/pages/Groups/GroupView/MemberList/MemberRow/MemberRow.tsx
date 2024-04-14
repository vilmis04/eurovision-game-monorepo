import { Box, Typography } from '@mui/material';
import { styles } from './MemberRow.styles';

interface MemberRowProps {
  member: string;
  memberRef: string;
}

export const MemberRow: React.FC<MemberRowProps> = ({ member, memberRef }) => (
  <Box sx={styles.nicknameWrapper} data-ref={memberRef}>
    <Typography variant="body1" sx={styles.nickname}>
      {member}
    </Typography>
  </Box>
);
