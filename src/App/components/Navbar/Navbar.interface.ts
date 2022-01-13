import { ConnectedProps } from 'react-redux';

import { connector } from './NavbarContainer';

export interface INavbarProps extends ConnectedProps<typeof connector> {}
