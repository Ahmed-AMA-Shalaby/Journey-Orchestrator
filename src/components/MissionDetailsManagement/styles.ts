import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const useSx: () => Record<string, SxProps<Theme>> = () => ({
  card: { p: 4, mb: 8 },
  stepper: { m: 2 },
});

export default useSx;
