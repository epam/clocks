import { ILocation } from '../../../../redux/types';

export interface ILocationBlockProps {
  location?: ILocation;
  urlUserLocation?: boolean;
}

export interface ITimeState {
  hours: string;
  minutes: string;
  day?: string;
  offset?: string;
}
