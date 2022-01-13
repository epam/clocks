import { ConnectedProps } from 'react-redux';
import { connector } from './DashboardContainer';

export interface IDashboardProps extends ConnectedProps<typeof connector> {
  className?: string;
}
