import { ILocation } from '../../../../../../../../redux/types';

export interface ICustomMenuItemProps {
  index: number;
  location: ILocation;
  handleSelectLocation: (location: ILocation) => void;
}
