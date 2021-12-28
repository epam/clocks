import { createSlice } from '@reduxjs/toolkit';

import { INITIAL_STATE } from './snackbar.constants';

const createSnackbarSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {}
  });

export const { actions: snackbarActions, reducer: snackbarReducer } =
  createSnackbarSlice('snackbar');
