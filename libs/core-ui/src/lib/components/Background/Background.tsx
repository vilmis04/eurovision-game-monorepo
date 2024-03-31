import { Box, SxProps, Theme } from '@mui/material';
import { styles } from './Background.styles';

export enum GradientType {
  GRADIENT1 = 'gradient1',
  GRADIENT2 = 'gradient2',
  SOLID1 = 'solid1',
}

interface BackgroundProps extends React.PropsWithChildren {
  variant: GradientType;
  sx?: SxProps<Theme>;
}

export const Background: React.FC<BackgroundProps> = ({
  variant = GradientType.GRADIENT1,
  sx = {},
  children,
  // TODO: review the noOverload error with sx prop
}) => (
  <Box sx={[styles.container, styles[variant]]}>
    <Box sx={sx}>{children}</Box>
  </Box>
);
