import moment from 'moment-timezone';
import { lookupTimezones, sortBestMatch } from '../helpers';

let myTz = {};

const getCurrentUserLocation = () => {
    myTz = moment.tz.guess();
    const matchingTimezones = lookupTimezones(myTz);
    const bestMatch = sortBestMatch(myTz, matchingTimezones);
    const { target } = bestMatch[0];

    return {
        ...target
    };
};

export default getCurrentUserLocation;
