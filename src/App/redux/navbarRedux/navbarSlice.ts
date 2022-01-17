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
      DashboardFontHandler(state, action: PayloadAction<string>) {
        const newFont = action.payload;
        state.dashboardFont = newFont;
      },
      HasCountryHandler(state, action: PayloadAction<boolean>) {
        const hasCountry = action.payload;
        state.hasCountry = hasCountry;
      },
      HasDateHandler(state, action: PayloadAction<boolean>) {
        const hasDate = action.payload;
        state.hasDate = hasDate;
      },
      ToggleHasTimezone(state, action: PayloadAction<boolean>) {
        const { hasTimezone } = state;
        state.hasTimezone = !hasTimezone;
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
      },
      HasTimezoneHandler(state, action) {
        const hasTimezone = action.payload;
        state.hasTimezone = hasTimezone;
      }
    }
  });

export const { actions: navbarActions, reducer: navbarReducer } =
  createNavbarSlice('navbar');
