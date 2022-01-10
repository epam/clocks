import { IAppLocation } from '../../redux/locationsRedux/locations.interface';

export interface INavbarProps {
  addCitySidebarHandler: () => void;
  locations: IAppLocation[];
}
