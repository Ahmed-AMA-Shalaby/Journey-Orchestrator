import { Box, Container, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

import AppSnackbar from '@/components/AppSnackbar';
import store from '@/store';

import AppRouter from './router';
import { theme } from './theme';

const App: React.FC = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography
                variant={isLargeScreen ? 'h2' : 'h4'}
                sx={{ my: { xs: 2.5, sm: 5 }, textAlign: 'center', a: { color: 'white', textDecoration: 'none' } }}
              >
                <Link to='/'>Journey Orchestrator</Link>
              </Typography>
            </Box>
            <AppRouter />
            <AppSnackbar />
          </LocalizationProvider>
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
