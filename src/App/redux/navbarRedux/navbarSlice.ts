/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_STATE, THEME } from './navbar.constants';
import { checkComputerThemeSupport, getComputerTheme } from '../../handlers';
import { TTheme } from './navbar.interface';

const createNavbarSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {
      ChangeDashboardFont(state, action) {
        const newFont = action.payload;
        return {
          ...state,
          dashboardFont: newFont
        };
      },
      ToggleHasCountry(state, action) {
        const { hasCountry } = state;
        return {
          ...state,
          hasCountry: !hasCountry
        };
      },
      ToggleHasDate(state, action) {
        const { hasDate } = state;
        return {
          ...state,
          hasDate: !hasDate
        };
      },
      ToggleHasTimezone(state, action) {
        const { hasTimezone } = state;
        return {
          ...state,
          hasTimezone: !hasTimezone
        };
      },
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

export const { actions: navbarActions, reducer: navbarReducer } =
  createNavbarSlice('navbar');
