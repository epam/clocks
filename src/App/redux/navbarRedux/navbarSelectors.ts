import { RootState } from '../rootReducer';

const getDashboardFont = (state: RootState) =>
  state.navbarReducer.dashboardFont;

export { getDashboardFont };
