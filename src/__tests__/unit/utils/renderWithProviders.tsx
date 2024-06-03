import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RootState } from '@/store/index';
import missionReducer from '@/store/mission/MissionSlice';
import snackbarReducer from '@/store/snackbar/SnackbarSlice';

export const renderWithProviders = (children: ReactElement, reduxState?: Partial<RootState>): RenderResult => {
  const defaultReduxState = {
    mission: { missions: [], selectedMission: undefined },
    snackbar: { isOpen: false, message: '' },
  };
  const store = configureStore({
    reducer: { mission: missionReducer, snackbar: snackbarReducer },
    preloadedState: { ...defaultReduxState, ...reduxState },
  });

  return render(
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={createTheme()}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
        </ThemeProvider>
      </Provider>
      ,
    </BrowserRouter>,
  );
};
