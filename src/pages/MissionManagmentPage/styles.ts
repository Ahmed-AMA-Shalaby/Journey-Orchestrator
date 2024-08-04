import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const useSx: () => Record<string, SxProps<Theme>> = () => ({
  backButtonWrapper: { display: 'flex', alignItems: 'center', my: { xs: 2.5, sm: 5 }, color: 'white' },
  backButtonIcon: { mr: 1 },
});

export default useSx;
