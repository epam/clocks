import moment from 'moment-timezone';
import { CityData } from 'city-timezones';
import cityMapping from '../constants/cityMapping';
import generateIdFormat from './generateIdFormat';
import { CURRENT_USER_LOCATION_ID } from '../constants';
import { lookupTimezones, sortBestMatch } from '../helpers';
import getUserLocation from './getUserLocation';

const getCurrentUserLocation = async (): Promise<string> => {
    const currentUserLocationId = localStorage.getItem(CURRENT_USER_LOCATION_ID);
    if (currentUserLocationId) {
        return currentUserLocationId;
    }
    const { error, id } = await getUserLocation();
    if (!error) {
        return id;
    }
    const myTz = moment.tz.guess();
    const matchingTimezones = lookupTimezones(myTz);
    if (!matchingTimezones.length) {
        const greenwichMainTime = (cityMapping as CityData[]).find(city => city.city_ascii === 'London');
        const { city_ascii: cityAscii, iso2, lat, lng } = greenwichMainTime as CityData;
        const greenwichMainTimeId = generateIdFormat(cityAscii, iso2, lat, lng);
        return greenwichMainTimeId;
    }
    const bestMatch = sortBestMatch(myTz, matchingTimezones, 'city_ascii');
    const { target } = bestMatch[0];
    const { city_ascii: cityAscii, iso2, lat, lng } = target;
    return generateIdFormat(cityAscii, iso2, lat, lng);
};

export default getCurrentUserLocation;
