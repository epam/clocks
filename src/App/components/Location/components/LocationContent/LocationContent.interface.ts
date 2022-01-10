import {
  IAppLocation,
  TCity,
  TCountry,
  TTimezone
} from '../../../../redux/locationsRedux/locations.interface';

export interface ILocationContentProps extends Partial<IAppLocation> {
  city: TCity;
  country: TCountry;
  timezone: TTimezone;
  hours: number;
  minutes: number;
  host: boolean;
}
