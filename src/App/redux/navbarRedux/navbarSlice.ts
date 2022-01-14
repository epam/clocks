/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './navbar.constants';

const createNavbarSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {
      DashboardFontHandler(state, action) {
        const newFont = action.payload;
        state.dashboardFont = newFont;
        // return {
        //   ...state,
        //   dashboardFont: newFont
        // };
      },
      HasCountryHandler(state, action) {
        const hasCountry = action.payload;
        state.hasCountry = hasCountry;
        // return {
        //   ...state,
        //   hasCountry
        // };
      },
      HasDateHandler(state, action) {
        const hasDate = action.payload;
        state.hasDate = hasDate;
        // return {
        //   ...state,
        //   hasDate
        // };
      },
      HasTimezoneHandler(state, action) {
        const hasTimezone = action.payload;
        state.hasTimezone = hasTimezone;
        // return {
        //   ...state,
        //   hasTimezone
        // };
      }
    }
  });

export const { actions: navbarActions, reducer: navbarReducer } =
  createNavbarSlice('navbar');
