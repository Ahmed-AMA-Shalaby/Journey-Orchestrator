import { Box, Container, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';

import store from '@/store';

import AppRouter from './router';

const App: React.FC = () => (
  <Provider store={store}>
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h2' sx={{ my: 5 }}>
            Journey Orchestrator
          </Typography>
        </Box>
        <AppRouter />
      </LocalizationProvider>
    </Container>
  </Provider>
);

export default App;
