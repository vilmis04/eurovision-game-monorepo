import { Box, SxProps, Theme } from '@mui/material';
import { styles } from './Background.styles';

interface BackgroundProps extends React.PropsWithChildren {
  variant: 'gradient1' | 'gradient2' | 'solid1';
  sx?: SxProps<Theme>;
}

export const Background: React.FC<BackgroundProps> = ({
  variant = 'gradient1',
  sx = {},
  children,
  // TODO: review the noOverload error with sx prop
}) => <Box sx={[styles.container, styles[variant], sx]}>{children}</Box>;
