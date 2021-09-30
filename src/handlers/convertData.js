import moment from 'moment-timezone';
import { cityMapping } from 'city-timezones';

const findOffset = (myTimezone, otherTimezone) => {
    const now = moment.utc();
    // get the zone offsets for this time, in minutes
    const myTz = moment.tz.zone(myTimezone).utcOffset(now);
    const otherTz = moment.tz.zone(otherTimezone).utcOffset(now);
    // calculate the difference in hours and minutes
    return {
        hours: Math.floor((myTz - otherTz) / 60),
        minutes: Math.abs((myTz - otherTz) % 60)
    };
};

const convertIdToObject = (id, message = '') => {
    const obj = cityMapping.find(
        i => [i.city_ascii, i.iso2, Math.floor(Math.abs(i.lat)), Math.floor(Math.abs(i.lng))].join('_') === id
    );

    return {
        id,
        city: obj.city,
        country: obj.country,
        timezone: obj.timezone,
        message
    };
};

const convertData = (urlDataList, locationId) => {
    let result = [];
    const myLocation = convertIdToObject(locationId); // converts users location
    const list = urlDataList.map(urlData => convertIdToObject(urlData['id'], urlData['message']));

    result = list.map(location => {
        if (locationId === location['id']) {
            return { ...location, host: true, offset: { hours: 0, minutes: 0 } };
        }
        return { ...location, host: false, offset: findOffset(myLocation.timezone, location.timezone) };
    });

    result.sort((a, b) => {
        const first = a.offset['hours'] * 60 + a.offset['minutes'];
        const second = b.offset['hours'] * 60 + b.offset['minutes'];
        return first - second;
    });

    return result;
};

export default convertData;
