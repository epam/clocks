import { connect } from 'react-redux';
import { getLocations } from '../../redux/locationsRedux/locationsSelectors';
import { locationsActions } from '../../redux/locationsRedux/locationsSlice';

import { RootState } from '../../redux/rootReducer';
import { getCurrentTheme } from '../../redux/themeRedux/themeSelectors';

import Dashboard from './Dashboard';

const { ChangeUserCurrentLocation, SetLocations } = locationsActions;

const mapStateToProps = (state: RootState) => {
  const currentTheme = getCurrentTheme(state);
  const locations = getLocations(state);

  return {
    currentTheme,
    locations
  };
};

const mapDispatchToProps = {
  ChangeUserCurrentLocation,
  SetLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
