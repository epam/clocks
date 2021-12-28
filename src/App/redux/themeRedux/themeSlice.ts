import { createSlice } from '@reduxjs/toolkit';

import { INITIAL_STATE } from './theme.constants';

const createThemeSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {}
  });

export const { actions: themeActions, reducer: themeReducer } =
  createThemeSlice('theme');
