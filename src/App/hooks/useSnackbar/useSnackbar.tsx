import { useDispatch } from 'react-redux';

import { setSnackbar } from '../../redux/actions';

const useSnackbar = () => {
  const dispatch = useDispatch();

  const closeSnackbar = () => {
    const payload = {
      status: false
    };

    dispatch(setSnackbar(payload));
  };

  const snackbarInfo = (text: string) => {
    const payload = {
      status: true,
      color: 'info',
      text
    };

    dispatch(setSnackbar(payload));
  };

  const snackbarSuccess = (text: string) => {
    const payload = {
      status: true,
      color: 'success',
      text
    };

    dispatch(setSnackbar(payload));
  };

  const snackbarError = (text: string) => {
    const payload = {
      status: true,
      color: 'error',
      text
    };

    dispatch(setSnackbar(payload));
  };

  return {
    snackbarInfo,
    snackbarSuccess,
    snackbarError,
    closeSnackbar
  };
};

export default useSnackbar;
