import { TCity, TCountry, TLocationId, TTimezone } from '../../lib/types';

export interface IConvertedObject {
  id: TLocationId;
  city: TCity;
  country: TCountry;
  timezone: TTimezone;
  message: string;
}
