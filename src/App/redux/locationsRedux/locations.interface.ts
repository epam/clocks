import { IOffset } from '../../lib/interfaces';
import { TCity, TCountry, TLocationId, TTimezone } from '../../lib/types';

export interface IAppLocation {
  id: TLocationId;
  offset: IOffset;
  timezone: TTimezone;
  city: TCity;
  country: TCountry;
  host: boolean;
  message: string;
  hasDate?: boolean;
  hasCountry?: boolean;
  hasTimezone?: boolean;
}

export interface ILocationsInitialState {
  locations: IAppLocation[];
}
