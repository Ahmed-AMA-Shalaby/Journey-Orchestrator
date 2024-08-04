import './index.css';

import { Box } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import useSx from './styles';

const Root = (): React.ReactNode => {
  const styles = useSx();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Box sx={styles.background}>
          <App />
        </Box>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
