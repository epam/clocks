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
      HasCountryHandler(state, action) {
        const hasCountry = action.payload;
        return {
          ...state,
          hasCountry
        };
      },
      HasDateHandler(state, action) {
        const hasDate = action.payload;
        return {
          ...state,
          hasDate
        };
      },
      HasTimezoneHandler(state, action) {
        const hasTimezone = action.payload;
        return {
          ...state,
          hasTimezone
        };
      }
    }
  });

export const { actions: navbarActions, reducer: navbarReducer } =
  createNavbarSlice('navbar');
