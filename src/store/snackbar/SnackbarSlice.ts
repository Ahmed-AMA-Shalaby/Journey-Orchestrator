import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SnackbarState = {
  message?: string;
};

const initialState: SnackbarState = { message: undefined };

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    hideSelectedSnackbar: (state) => {
      state.message = initialState.message;
    },
    showSnackbar: (state, { payload }: PayloadAction<string>) => {
      state.message = payload;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice.reducer;
