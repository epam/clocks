import { connect } from 'react-redux';
import { getSnackbarVisibility } from '../../redux/snackbarRedux/snackbarSelectors';
import { snackbarActions } from '../../redux/snackbarRedux/snackbarSlice';
import { RootState } from '../../redux/rootReducer';
import Location from './Location';

const { snackbar } = snackbarActions;

const mapStateToProp = (state: RootState) => {
  const visibility = getSnackbarVisibility(state);

  return { visibility };
};

const mapDispatchToProp = {
  snackbar
};

export default connect(mapStateToProp, mapDispatchToProp)(Location);
