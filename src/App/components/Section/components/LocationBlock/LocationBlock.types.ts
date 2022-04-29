import { Dispatch } from 'react';
import { ILocation } from '../../../../redux/types';

export interface ILocationBlockProps {
  location?: ILocation;
  urlUserLocation?: boolean;
  index: number;
  selectedLocation: ILocation | null;
  setSelectedLocation: Dispatch<React.SetStateAction<ILocation | null>>;
}

export interface ITimeState {
  hours: string;
  minutes: string;
  suffix: string;
  day?: string;
  offset?: string;
  timezone?: string;
}
