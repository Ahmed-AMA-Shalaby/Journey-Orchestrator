import { Box, Container, ThemeProvider, Typography, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';

import AppSnackbar from '@/components/AppSnackbar';
import store from '@/store';

import AppRouter from './router';
import useSx from './styles';
import { theme } from './theme';

const App: React.FC = () => {
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const styles = useSx();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={styles.titleWrapper}>
              <Typography variant={isLargeScreen ? 'h2' : 'h4'} sx={styles.title}>
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
