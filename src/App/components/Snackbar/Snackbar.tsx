import { FC, SyntheticEvent } from 'react';

import { Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';
import { ISnackbarProps } from './Snackbar.interface';

const Snackbar: FC<ISnackbarProps> = ({
  visibility,
  message,
  type,
  snackbar
}) => {
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    snackbar({ visibility: false });
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={visibility}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <MuiAlert
        severity={type}
        onClose={handleClose}
        elevation={6}
        variant="filled"
      >
        {message}
      </MuiAlert>
    </MuiSnackbar>
  );
};

export default Snackbar;
