/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnackbarVisibility } from './snackbar.interface';
import { INITIAL_STATE } from './snackbar.constants';

const createSnackbarSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {
      snackbar(state, action: PayloadAction<ISnackbarVisibility>) {
        state.visibility = action.payload.visibility;
        if (action.payload.message) state.message = action.payload.message;
        if (action.payload.type) state.type = action.payload.type;
      }
    }
  });

export const { actions: snackbarActions, reducer: snackbarReducer } =
  createSnackbarSlice('snackbar');
