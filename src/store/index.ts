import { configureStore } from '@reduxjs/toolkit';

import MissionReducer from './mission/MissionSlice';
import SnackbarReducer from './snackbar/SnackbarSlice';

const store = configureStore({
  reducer: {
    mission: MissionReducer,
    snackbar: SnackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
