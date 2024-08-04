import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { SyntheticEvent } from 'react';

import useSx from '@/components/AppSnackbar/styles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { snackbarActions } from '@/store/snackbar/SnackbarSlice';

const AppSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message } = useAppSelector((state) => state.snackbar);
  const styles = useSx();

  const close = (event?: SyntheticEvent | Event, reason?: string): void => {
    if (event && reason === 'clickaway') {
      return;
    }

    dispatch(snackbarActions.hideSelectedSnackbar());
  };

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={5000}
      onClose={close}
    >
      <Alert onClose={close} severity='success' variant='filled' sx={styles.fullWidth}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
