import { connect } from 'react-redux';
import { getLocations } from '../../redux/locationsRedux/locationsSelectors';
import { locationsActions } from '../../redux/locationsRedux/locationsSlice';
import { snackbarActions } from '../../redux/snackbarRedux/snackbarSlice';
import {
  getSnackbarVisibility,
  getSnackbarMessage,
  getSnackbarType
} from '../../redux/snackbarRedux/snackbarSelectors';

import { RootState } from '../../redux/rootReducer';
import {
  getHasCountry,
  getHasDate,
  getHasTimezone,
  getDashboardFont,
  getAutoStatus,
  getCurrentTheme
} from '../../redux/navbarRedux/navbarSelectors';

import Dashboard from './Dashboard';

const { ChangeUserCurrentLocation, SetLocations } = locationsActions;
const { snackbarHandler } = snackbarActions;

const mapStateToProps = (state: RootState) => {
  const type = getCurrentTheme(state);
  const autoTheming = getAutoStatus(state);
  const locations = getLocations(state);
  const visibility = getSnackbarVisibility(state);
  const message = getSnackbarMessage(state);
  const snackbarType = getSnackbarType(state);
  const hasCountry = getHasCountry(state);
  const hasDate = getHasDate(state);
  const hasTimezone = getHasTimezone(state);
  const dashboardFont = getDashboardFont(state);

  return {
    type,
    autoTheming,
    locations,
    visibility,
    message,
    snackbarType,
    hasCountry,
    hasDate,
    hasTimezone,
    dashboardFont
  };
};

const mapDispatchToProps = {
  ChangeUserCurrentLocation,
  SetLocations,
  snackbarHandler
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dashboard);
