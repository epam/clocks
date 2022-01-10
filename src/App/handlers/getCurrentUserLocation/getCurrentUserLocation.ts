import moment from 'moment-timezone';

import generateIdFormat from '../generateIdFormat/generateIdFormat';
import getUserLocation from '../getUserLocation/getUserLocation';
import { lookupTimezones, sortBestMatch, getGreenwichMainTime } from '..';
import { ICityData } from '../../lib/interfaces';
import { CURRENT_USER_LOCATION_ID } from '../../redux/locationsRedux/locations.constants';

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
  const bestMatch = sortBestMatch(myTz, matchingTimezones, 'city_ascii');
  if (!matchingTimezones.length || !bestMatch[0]) {
    const greenwichMainTime = getGreenwichMainTime();
    const {
      city_ascii: cityAscii,
      iso2,
      lat,
      lng
    } = greenwichMainTime as ICityData;
    const greenwichMainTimeId = generateIdFormat(cityAscii, iso2, lat, lng);
    return greenwichMainTimeId;
  }
  const { target } = bestMatch[0];
  const { city_ascii: cityAscii, iso2, lat, lng } = target;
  return generateIdFormat(cityAscii, iso2, lat, lng);
};

export default getCurrentUserLocation;
