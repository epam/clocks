import { TCity, TCountry, TTimezone } from '.';
import { TLocationId } from './urlLocation';

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
}

export type { IAppLocation };
