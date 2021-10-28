import moment from 'moment-timezone';
import { CityData } from 'city-timezones';
import cityMapping from '../constants/cityMapping';
import generateIdFormat from './generateIdFormat';

type offset = {
    hours: number;
    minutes: number;
};
interface Location {
    host: boolean;
    offset: { hours: number; minutes: number };
    id?: string | undefined;
    city?: any;
    country?: any;
    timezone?: any;
    message?: string | undefined;
}

const findOffset = (myTimezone: string, otherTimezone: string): offset => {
    if (!myTimezone) {
        return { hours: 0, minutes: 0 };
    }
    const now = moment.utc();
    // get the zone offsets for this time, in minutes
    const myTz = moment?.tz?.zone(myTimezone)?.utcOffset(now as unknown as number);
    const otherTz = moment?.tz?.zone(otherTimezone)?.utcOffset(now as unknown as number);
    // calculate the difference in hours and minutes
    return {
        hours: Math.floor(((myTz as number) - (otherTz as number)) / 60),
        minutes: Math.abs(((myTz as number) - (otherTz as number)) % 60)
    };
};

const convertIdToObject = (id: string, message = '') => {
    if (!id || typeof id !== 'string') {
        return null;
    }
    const obj = cityMapping.find((i: CityData) => generateIdFormat(i.city_ascii, i.iso2, i.lat, i.lng) === id);

    return {
        id,
        city: obj?.city,
        country: obj?.country,
        timezone: obj?.timezone,
        message
    };
};

const convertData = (urlDataList: any = [], locationId: string): Location[] => {
    let result: Location[] = [];
    if (!Array.isArray(urlDataList)) {
        return result;
    }
    const myLocation = convertIdToObject(locationId); // converts users location
    const list = urlDataList.map(urlData => convertIdToObject(urlData['id'], urlData['message']));

    result = list.map(location => {
        if (locationId === (location as Location)['id']) {
            return { ...location, host: true, offset: { hours: 0, minutes: 0 } };
        }
        return { ...location, host: false, offset: findOffset(myLocation?.timezone, location?.timezone) };
    });

    result.sort((a: Location, b: Location) => {
        const first = a?.offset['hours'] * 60 + a?.offset['minutes'];
        const second = b?.offset['hours'] * 60 + b?.offset['minutes'];
        return first - second;
    });

    return result;
};

export default convertData;
