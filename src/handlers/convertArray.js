import moment from 'moment-timezone';
import { lookupTimezones, sortBestMatch, arrayIncludes } from '../helpers';

let myTz = {};
let myCity = '';
let array = [];

const findOffset = timezone => {
    const now = moment.utc();
    // get the zone offsets for this time, in minutes
    const myTimezone = moment.tz.zone(myTz).utcOffset(now);
    const otherTimezone = moment.tz.zone(timezone).utcOffset(now);
    // calculate the difference in hours
    return Math.floor((myTimezone - otherTimezone) / 60);
};

const convertArray = list => {
    myTz = moment.tz.guess();

    const matchingTimezones = lookupTimezones(myTz);
    const bestMatch = sortBestMatch(myTz, matchingTimezones);

    const { target } = bestMatch[0];
    myCity = target.city;

    const city = arrayIncludes(myCity, 'city_ascii', list);
    const timezone = arrayIncludes(myTz, 'timezone', list);

    if (!city && !timezone) {
        if (list.length < 12) {
            array = list.map(item => ({
                ...item,
                offset: findOffset(item.timezone),
                host: false
            }));

            array.push({
                city: target.city,
                country: target.country,
                timezone: target.timezone,
                message: '',

                offset: 0,
                host: true
            });
        } else {
            return list;
        }
    } else {
        let selected = false;
        array = list.map(item => {
            if (city && item.city === myCity) {
                return { ...item, offset: 0, host: true };
            }
            if (!city && item.timezone === myTz && !selected) {
                selected = true;
                return { ...item, offset: 0, host: true };
            }
            return {
                ...item,
                offset: findOffset(item.timezone),
                host: false
            };
        });
    }

    array.sort((a, b) => a.offset - b.offset);

    return array;
};

export default convertArray;
