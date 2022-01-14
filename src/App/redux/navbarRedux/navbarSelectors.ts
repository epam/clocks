import { RootState } from '../rootReducer';

const getDashboardFont = (state: RootState) =>
  state.navbarReducer.dashboardFont;

const getHasCountry = (state: RootState) => state.navbarReducer.hasCountry;

const getHasDate = (state: RootState) => state.navbarReducer.hasDate;

const getHasTimezone = (state: RootState) => state.navbarReducer.hasTimezone;

export { getDashboardFont, getHasCountry, getHasDate, getHasTimezone };

export const getAutoStatus = (state: RootState) => state.navbarReducer.auto;

export const getCurrentTheme = (state: RootState) => state.navbarReducer.theme;
