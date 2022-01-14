import { connect } from 'react-redux';
import {
  getDashboardFont,
  getHasCountry,
  getHasDate,
  getHasTimezone,
  getCurrentTheme,
  getAutoStatus
} from '../../redux/navbarRedux/navbarSelectors';
import { RootState } from '../../redux/rootReducer';
import { navbarActions } from '../../redux/navbarRedux/navbarSlice';
import { snackbarActions } from '../../redux/snackbarRedux/snackbarSlice';

import Navbar from './Navbar';
import { getLocations } from '../../redux/locationsRedux/locationsSelectors';

const { snackbarHandler } = snackbarActions;
const {
  ToggleHasCountry,
  ToggleHasDate,
  ToggleHasTimezone,
  ChangeDashboardFont,
  toggleAutoTheming,
  setTheme
} = navbarActions;

const mapStateToProps = (state: RootState) => {
  const dashboardFont = getDashboardFont(state);
  const hasCountry = getHasCountry(state);
  const hasDate = getHasDate(state);
  const hasTimezone = getHasTimezone(state);
  const autoTheming = getAutoStatus(state);
  const type = getCurrentTheme(state);
  const locations = getLocations(state);

  return {
    locations,
    autoTheming,
    type,
    dashboardFont,
    hasCountry,
    hasDate,
    hasTimezone
  };
};

const mapDispatchToProps = {
  toggleAutoTheming,
  ToggleHasCountry,
  ToggleHasDate,
  ToggleHasTimezone,
  setTheme,
  ChangeDashboardFont,
  snackbarHandler
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Navbar);
