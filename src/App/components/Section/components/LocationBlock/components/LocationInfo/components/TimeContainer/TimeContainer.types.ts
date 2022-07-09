import { ILocation } from '../../../../../../../../redux/types';

export interface ITimeContainerProps {
  location?: ILocation;
}

export interface ITimeState {
  hours: string;
  minutes: string;
  suffix: string;
  day?: string;
  offset?: string;
  timezone?: string;
}
