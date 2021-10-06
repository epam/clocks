import moment from 'moment-timezone';
import generateIdFormat from './generateIdFormat';
import { CURRENT_USER_LOCATION_ID } from '../constants';
import { lookupTimezones, sortBestMatch } from '../helpers';
import getUserLocation from './getUserLocation';

let myTz = {};

const getCurrentUserLocation = async () => {
    const currentUserLocationId = localStorage.getItem(CURRENT_USER_LOCATION_ID);
    if (currentUserLocationId) {
        return currentUserLocationId;
    }
    const { error, id } = await getUserLocation();
    if (!error) {
        return id;
    }
    myTz = moment.tz.guess();
    const matchingTimezones = lookupTimezones(myTz);
    const bestMatch = sortBestMatch(myTz, matchingTimezones);
    const { target } = bestMatch[0];
    const { city_ascii: cityAscii, iso2, lat, lng } = target;
    return generateIdFormat(cityAscii, iso2, lat, lng);
};

export default getCurrentUserLocation;
