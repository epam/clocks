import { ILocation } from '../../../../../../../../redux/types';

export interface IButtonContainerProps {
  location?: ILocation;
  urlUserLocation?: boolean;
  index: number;
  isFocused: boolean;
  isUserLocation: boolean;
}
