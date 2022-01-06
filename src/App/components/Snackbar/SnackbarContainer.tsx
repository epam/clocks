import { connect } from 'react-redux';
import {
  getSnackbarVisibility,
  getSnackbarMessage,
  getSnackbarType
} from '../../redux/snackbarRedux/snackbarSelectors';
import { snackbarActions } from '../../redux/snackbarRedux/snackbarSlice';

import { RootState } from '../../redux/rootReducer';
import Snackbar from './Snackbar';

const { snackbar } = snackbarActions;

const mapStateToProp = (state: RootState) => {
  const visibility = getSnackbarVisibility(state);
  const message = getSnackbarMessage(state);
  const type = getSnackbarType(state);

  return {
    visibility,
    message,
    type
  };
};

const mapDispatchToProp = {
  snackbar
};

export const connector = connect(mapStateToProp, mapDispatchToProp);

export default connector(Snackbar);
