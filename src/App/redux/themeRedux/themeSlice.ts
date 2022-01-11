/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INITIAL_STATE, THEME } from './theme.constants';
import { TTheme } from './theme.interface';
import { checkComputerThemeSupport, getComputerTheme } from '../../handlers';

const createThemeSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {
      setTheme(state, action: PayloadAction<TTheme>) {
        state.theme = action.payload;
      },
      toggleAutoTheming(state, action: PayloadAction<boolean>) {
        const doesComputerSupport = checkComputerThemeSupport();
        if (!doesComputerSupport) return state;

        if (action.payload) {
          state.theme = getComputerTheme();
        } else {
          const theme = localStorage.getItem(THEME) as TTheme;
          if (theme) {
            state.theme = theme;
          }
        }
        state.auto = action.payload;
      }
    }
  });

export const { actions: themeActions, reducer: themeReducer } =
  createThemeSlice('theme');
