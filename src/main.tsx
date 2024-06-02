import './index.css';

import { Box } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Box
        sx={{
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
        }}
      >
        <App />
      </Box>
    </BrowserRouter>
  </React.StrictMode>,
);
