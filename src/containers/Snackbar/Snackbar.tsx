import { FC, useContext, SyntheticEvent } from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarContext } from '../../context/snackbar';

const Snackbar: FC = () => {
  const {
    state: { isSnackbarOpen, message, position, status },
    actions: { SnackbarHandler }
  } = useContext(SnackbarContext);

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    if (SnackbarHandler) {
      SnackbarHandler(false);
    }
  };
  const SnackbarStatus = status || 'success';

  return (
    <MuiSnackbar
      anchorOrigin={position}
      open={isSnackbarOpen}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <MuiAlert
        severity={SnackbarStatus}
        onClose={handleClose}
        elevation={6}
        variant="filled"
      >
        {message || ''}
      </MuiAlert>
    </MuiSnackbar>
  );
};

export default Snackbar;
