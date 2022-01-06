import { ConnectedProps } from 'react-redux';
import { connector } from './SnackbarContainer';

export interface ISnackbarProps extends ConnectedProps<typeof connector> {}
