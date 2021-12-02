import moment from 'moment-timezone';
import { ICityData } from '../../types/timezones';
import cityMapping from '../../constants/cityMapping';
import { generateIdFormat } from '../index';
import { IAppLocation, IOffset, IUrlLocation, TCity, TCountry, TLocationId, TTimezone } from '../../types/location';
import { HAS_COUNTRY, HAS_DATE, HAS_TIMEZONE } from '../../constants';

interface IConvertedObject {
    id: TLocationId;
    city: TCity;
    country: TCountry;
    timezone: TTimezone;
    message: string;
}

const findOffset = (myTimezone?: string, otherTimezone?: string): IOffset => {
    if (!myTimezone || !otherTimezone) {
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

const convertIdToObject = (id: string, message = ''): IConvertedObject => {
    const obj = cityMapping.find((i: ICityData) => generateIdFormat(i.city_ascii, i.iso2, i.lat, i.lng) === id);
    return {
        id,
        city: obj?.city || '',
        country: obj?.country || '',
        timezone: obj?.timezone || '',
        message
    };
};

const getStorageValue = (key: string) => {
    const storageValue = localStorage.getItem(key);
    if (!storageValue && storageValue !== 'false') {
        return true;
    }
    return JSON.parse(storageValue);
};

const convertData = (urlDataList: IUrlLocation[] = [], locationId: TLocationId): IAppLocation[] => {
    let result: IAppLocation[] = [];
    if (!Array.isArray(urlDataList)) {
        return result;
    }
    const myLocation = convertIdToObject(locationId); // converts users location
    const list = urlDataList.map(urlData => convertIdToObject(urlData['id'], urlData['message']));
    const hasDate = getStorageValue(HAS_DATE);
    const hasCountry = getStorageValue(HAS_COUNTRY);
    const hasTimezone = getStorageValue(HAS_TIMEZONE);
    result = list.map(location => {
        if (locationId === (location as IAppLocation)['id']) {
            return { ...location, host: true, offset: { hours: 0, minutes: 0 }, hasDate, hasCountry, hasTimezone };
        }
        return {
            ...location,
            host: false,
            offset: findOffset(myLocation?.timezone, location?.timezone),
            hasDate,
            hasCountry,
            hasTimezone
        };
    });

    result.sort((a: IAppLocation, b: IAppLocation) => {
        const first = a?.offset['hours'] * 60 + a?.offset['minutes'];
        const second = b?.offset['hours'] * 60 + b?.offset['minutes'];
        return first - second;
    });

    return result;
};

export default convertData;
