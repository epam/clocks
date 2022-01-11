export type TCountry = string;
export type TCity = string;
export type TCityAscii = string;
export type TIso2 = string;
export type TIso3 = string;
export type TLat = number;
export type TLng = number;
export type TPop = number;
export type TProvince = string;
export type TTimezone = string;
export type TLocationId = string;

export interface IOffset {
  hours: number;
  minutes: number;
}

export interface IUrlLocation {
  id: TLocationId;
  message: string;
}
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
