import { TCity, TCountry, TLocationId, TTimezone } from '../../types/location';

export interface IConvertedObject {
  id: TLocationId;
  city: TCity;
  country: TCountry;
  timezone: TTimezone;
  message: string;
}
