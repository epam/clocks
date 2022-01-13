import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './navbar.constants';

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
      }
    }
  });

export const { actions: navbarActions, reducer: navbarReducer } =
  createNavbarSlice('navbar');
