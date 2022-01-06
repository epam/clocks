import { RootState } from '../rootReducer';

export const getSnackbarVisibility = (state: RootState) =>
  state.snackbarReducer.visibility;

export const getSnackbarMessage = (state: RootState) =>
  state.snackbarReducer.message;

export const getSnackbarType = (state: RootState) => state.snackbarReducer.type;
