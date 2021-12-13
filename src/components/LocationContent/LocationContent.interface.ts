import { IAppLocation, TCity, TCountry, TTimezone } from '../../types/location';

export interface ILocationContentProps extends Partial<IAppLocation> {
  city: TCity;
  country: TCountry;
  timezone: TTimezone;
  hours: number;
  minutes: number;
  host: boolean;
}
