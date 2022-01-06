import { connect } from 'react-redux';
import { snackbarActions } from '../../../../redux/snackbarRedux/snackbarSlice';
import CopyURLButton from './CopyURLButton';

const { snackbar } = snackbarActions;

const mapDispatchToProps = {
  snackbar
};

export const connector = connect(null, mapDispatchToProps);

export default connector(CopyURLButton);
