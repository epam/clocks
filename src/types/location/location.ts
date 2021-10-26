type TCountry = string;
type TCity = string;
type TCityAscii = string;
type TIso2 = string;
type TIso3 = string;
type TLat = number;
type TLng = number;
type TPop = number;
type TProvince = string;
type TTimezone = string;

interface ILocation {
    city?: TCity;
    /* eslint-disable camelcase */
    city_ascii: TCityAscii;
    country?: TCountry;
    iso2: TIso2;
    iso3?: TIso3;
    lat: TLat;
    lng: TLng;
    pop?: TPop;
    province?: TProvince;
    timezone?: TTimezone;
}

export type { ILocation, TCountry, TCity, TCityAscii, TIso2, TIso3, TLat, TLng, TPop, TProvince, TTimezone };
