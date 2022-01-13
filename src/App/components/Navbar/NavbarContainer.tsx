import { connect } from 'react-redux';
import {
  getDashboardFont,
  getHasCountry,
  getHasDate,
  getHasTimezone
} from '../../redux/navbarRedux/navbarSelectors';
import { RootState } from '../../redux/rootReducer';
import {
  getAutoStatus,
  getCurrentTheme
} from '../../redux/themeRedux/themeSelectors';
import { navbarActions } from '../../redux/navbarRedux/navbarSlice';
import { themeActions } from '../../redux/themeRedux/themeSlice';
import { snackbarActions } from '../../redux/snackbarRedux/snackbarSlice';

import Navbar from './Navbar';
import { getLocations } from '../../redux/locationsRedux/locationsSelectors';

const { toggleAutoTheming, setTheme } = themeActions;
const { snackbarHandler } = snackbarActions;
const {
  HasCountryHandler,
  HasDateHandler,
  HasTimezoneHandler,
  ChangeDashboardFont
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
  HasCountryHandler,
  HasDateHandler,
  HasTimezoneHandler,
  setTheme,
  ChangeDashboardFont,
  snackbarHandler
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Navbar);
