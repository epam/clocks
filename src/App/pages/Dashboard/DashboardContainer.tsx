import { connect } from 'react-redux';

import { RootState } from '../../redux/rootReducer';
import { getCurrentTheme } from '../../redux/themeRedux/themeSelectors';

import Dashboard from './Dashboard';

const mapStateToProps = (state: RootState) => {
  const currentTheme = getCurrentTheme(state);

  return {
    currentTheme
  };
};

export default connect(mapStateToProps, null)(Dashboard);
