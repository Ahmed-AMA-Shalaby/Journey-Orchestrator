import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const useSx: () => Record<string, SxProps<Theme>> = () => ({
  wrapper: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { my: { xs: 2.5, sm: 5 }, color: 'white' },
  startMissionbutton: { mb: { xs: 3, sm: 0, gap: 10 } },
});

export default useSx;
