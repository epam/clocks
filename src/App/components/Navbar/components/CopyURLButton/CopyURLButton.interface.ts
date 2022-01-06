import { ConnectedProps } from 'react-redux';
import { connector } from './CopyURLButtonContainer';

export interface IProps extends ConnectedProps<typeof connector> {}
