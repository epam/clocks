/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISnackbar } from './snackbar.interface';
import { INITIAL_STATE } from './snackbar.constants';

const createSnackbarSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {
      snackbarHandler(state, action: PayloadAction<ISnackbar>) {
        state.visibility = action.payload.visibility;
        if (action.payload.message) state.message = action.payload.message;
        if (action.payload.type) state.type = action.payload.type;
      }
    }
  });

export const { actions: snackbarActions, reducer: snackbarReducer } =
  createSnackbarSlice('snackbar');
