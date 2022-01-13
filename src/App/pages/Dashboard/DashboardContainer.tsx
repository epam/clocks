import { connect } from 'react-redux';
import { getLocations } from '../../redux/locationsRedux/locationsSelectors';
import { locationsActions } from '../../redux/locationsRedux/locationsSlice';
import { snackbarActions } from '../../redux/snackbarRedux/snackbarSlice';
import { themeActions } from '../../redux/themeRedux/themeSlice';
import {
  getSnackbarVisibility,
  getSnackbarMessage,
  getSnackbarType
} from '../../redux/snackbarRedux/snackbarSelectors';

import { RootState } from '../../redux/rootReducer';
import {
  getCurrentTheme,
  getAutoStatus
} from '../../redux/themeRedux/themeSelectors';

import Dashboard from './Dashboard';
import {
  getHasCountry,
  getHasDate,
  getHasTimezone
} from '../../redux/navbarRedux/navbarSelectors';

const { ChangeUserCurrentLocation, SetLocations } = locationsActions;
const { toggleAutoTheming, setTheme } = themeActions;
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

  return {
    type,
    autoTheming,
    locations,
    visibility,
    message,
    snackbarType,
    hasCountry,
    hasDate,
    hasTimezone
  };
};

const mapDispatchToProps = {
  toggleAutoTheming,
  setTheme,
  ChangeUserCurrentLocation,
  SetLocations,
  snackbarHandler
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dashboard);
