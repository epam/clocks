import { Dispatch, ReactNode } from 'react';
import { ILocation } from '../../../../../../redux/types';

export interface IDragDropContainerProps {
  location?: ILocation;
  urlUserLocation?: boolean;
  index: number;
  selectedLocation: ILocation | null;
  setSelectedLocation: Dispatch<React.SetStateAction<ILocation | null>>;
  children: Array<ReactNode>;
}
