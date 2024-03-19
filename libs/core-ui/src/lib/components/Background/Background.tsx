import { Box } from '@mui/material';
import { styles } from './Background.styles';

interface BackgroundProps extends React.PropsWithChildren {
  variant: 'gradient1' | 'gradient2';
}

export const Background: React.FC<BackgroundProps> = ({
  variant,
  children,
}) => <Box sx={styles[variant]}>{children}</Box>;
