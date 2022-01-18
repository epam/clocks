import { connect } from 'react-redux';
import { getDashboardFont } from '../../redux/navbarRedux/navbarSelectors';
import { RootState } from '../../redux/rootReducer';

import Footer from './Footer';

const mapStateToProps = (state: RootState) => {
  const dashboardFont = getDashboardFont(state);
  return {
    dashboardFont
  };
};

const connector = connect(mapStateToProps)(Footer);

export default connector;
