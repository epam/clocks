import { IAppLocation } from '../../lib/interfaces';

export interface INavbarProps {
  addCitySidebarHandler: () => void;
  locations: IAppLocation[];
}
