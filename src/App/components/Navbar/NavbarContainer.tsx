import { connect } from 'react-redux';
import { getDashboardFont } from '../../redux/navbarRedux/navbarSelectors';
import { RootState } from '../../redux/rootReducer';
import Navbar from './Navbar';

const mapStateToProps = (state: RootState) => {
  const dashboardFont = getDashboardFont(state);

  return {
    dashboardFont
  };
};

const mapDispatchToProps = {};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Navbar);
