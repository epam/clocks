import { Dispatch } from 'react';
import { ILocation } from '../../../../../../redux/types';

export interface ILocationComponentProps {
  location?: ILocation;
  urlUserLocation?: boolean;
  index: number;
  setSelectedLocation: Dispatch<React.SetStateAction<ILocation | null>>;
}
