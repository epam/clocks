import moment from 'moment-timezone';
import { cityMapping } from 'city-timezones';
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
    return {
        hours: Math.floor((myTimezone - otherTimezone) / 60),
        minutes: Math.abs((myTimezone - otherTimezone) % 60)
    };
};

const convertData = list => {
    myTz = moment.tz.guess();
    console.log(list);
    const matchingTimezones = lookupTimezones(myTz);
    const bestMatch = sortBestMatch(myTz, matchingTimezones);

    const { target } = bestMatch[0];
    myCity = target.city; // most possibly i live here.

    const converted = list.map(urlData => {
        const { id } = urlData;
        const { message } = urlData;

        // eslint-disable-next-line array-callback-return
        const obj = cityMapping.find(item => {
            const guid = [
                item.city_ascii,
                item.iso2,
                Math.floor(Math.abs(item.lat)),
                Math.floor(Math.abs(item.lng))
            ].join('_');
            if (guid === id) {
                return true;
            }
        });

        return {
            id: urlData.id,
            city: obj?.city,
            country: obj.country,
            timezone: obj.timezone,
            message
        };
    });

    const city = arrayIncludes(myCity, 'city_ascii', converted);
    const timezone = arrayIncludes(myTz, 'timezone', converted);

    if (!city && !timezone) {
        if (converted.length < 12) {
            array = converted.map(item => ({
                ...item,
                offset: findOffset(item.timezone),
                host: false
            }));

            array.push({
                city: target.city,
                country: target.country,
                timezone: target.timezone,
                message: '',

                offset: { hours: 0, minutes: 0 },
                host: true
            });
        } else {
            return list;
        }
    } else {
        let selected = false;
        array = converted.map(item => {
            if (city && item.city === myCity) {
                return { ...item, offset: { hours: 0, minutes: 0 }, host: true };
            }
            if (!city && item.timezone === myTz && !selected) {
                selected = true;
                return { ...item, offset: { hours: 0, minutes: 0 }, host: true };
            }
            return {
                ...item,
                offset: findOffset(item.timezone),
                host: false
            };
        });
    }

    array.sort((a, b) => {
        const first = a.offset['hours'] * 60 + a.offset['minutes'];
        const second = b.offset['hours'] * 60 + b.offset['minutes'];
        return first - second;
    });

    return array;
};

export default convertData;
