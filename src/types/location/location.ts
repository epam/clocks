import { ICityData } from '../timezones';

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
type TLocationId = string;

interface IOffset {
    hours: number;
    minutes: number;
}

interface IAppLocation {
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

interface IMatchingLocation {
    rating: number;
    target: ICityData;
}

interface IUrlLocation {
    id: TLocationId;
    message: string;
}

export type {
    TCountry,
    TCity,
    TCityAscii,
    TIso2,
    TIso3,
    TLat,
    TLng,
    TPop,
    TProvince,
    TTimezone,
    IOffset,
    IAppLocation,
    IMatchingLocation,
    IUrlLocation,
    TLocationId
};
