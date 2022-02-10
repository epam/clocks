import { ILocation } from '../../../../redux/types';

export interface ILocationBlockProps {
  location?: ILocation;
  urlUserLocation?: boolean;
  index: number;
}

export interface ITimeState {
  hours: string;
  minutes: string;
  suffix: string;
  day?: string;
  offset?: string;
}
