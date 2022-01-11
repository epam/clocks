import {
  TCity,
  TCountry,
  TLocationId,
  TTimezone
} from '../../redux/locationsRedux/locations.interface';

export interface IConvertedObject {
  id: TLocationId;
  city: TCity;
  country: TCountry;
  timezone: TTimezone;
  message: string;
}
