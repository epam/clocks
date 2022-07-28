import { Dispatch, ReactNode } from 'react';
import { ILocation } from '../../../../../../redux/types';

export interface IDragDropContainerProps {
  location?: ILocation;
  urlUserLocation?: boolean;
  selectedLocation: ILocation | null;
  setSelectedLocation: Dispatch<React.SetStateAction<ILocation | null>>;
  focusHandler: () => void;
  children: Array<ReactNode>;
}
