import { configureStore } from '@reduxjs/toolkit';

import MissionReducer from './mission/MissionSlice';

const store = configureStore({
  reducer: {
    mission: MissionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
