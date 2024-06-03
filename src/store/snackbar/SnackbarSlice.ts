import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SnackbarState = {
  isOpen: boolean;
  message: string;
};

const initialState: SnackbarState = { isOpen: false, message: '' };

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    hideSelectedSnackbar: (state) => {
      state.isOpen = initialState.isOpen;
    },
    showSnackbar: (state, { payload }: PayloadAction<string>) => {
      state.isOpen = true;
      state.message = payload;
    },
  },
});

export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice.reducer;
