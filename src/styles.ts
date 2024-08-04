import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const useSx: () => Record<string, SxProps<Theme>> = () => ({
  background: {
    '&:before': {
      content: "''",
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      backgroundImage: "url('/assets/background.jpg')",
      backgroundSize: 'cover',
      height: '100%',
      filter: 'brightness(0.2) blur(4px)',
      transform: 'scale(1.1)',
    },
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: { my: { xs: 2.5, sm: 5 }, textAlign: 'center', a: { color: 'white', textDecoration: 'none' } },
});

export default useSx;
