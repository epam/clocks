import moment from 'moment-timezone';

import { generateIdFormat } from '../index';
import cityMapping from '../../lib/city-timezones.json';
import { ICityData } from '../../lib/interfaces';
import {
  IAppLocation,
  IOffset,
  IUrlLocation,
  TLocationId
} from '../../redux/locationsRedux/locations.interface';

import { IConvertedObject } from './convertData.interface';

const findOffset = (myTimezone?: string, otherTimezone?: string): IOffset => {
  if (!myTimezone || !otherTimezone) {
    return { hours: 0, minutes: 0 };
  }
  const now = moment.utc();
  // get the zone offsets for this time, in minutes
  const myTz = moment?.tz
    ?.zone(myTimezone)
    ?.utcOffset(now as unknown as number);
  const otherTz = moment?.tz
    ?.zone(otherTimezone)
    ?.utcOffset(now as unknown as number);
  // calculate the difference in hours and minutes
  return {
    hours: Math.floor(((myTz as number) - (otherTz as number)) / 60),
    minutes: Math.abs(((myTz as number) - (otherTz as number)) % 60)
  };
};

const convertIdToObject = (id: string, message = ''): IConvertedObject => {
  const obj = cityMapping.find(
    (i: ICityData) =>
      generateIdFormat(i.city_ascii, i.iso2, i.lat, i.lng) === id
  );
  return {
    id,
    city: obj?.city || '',
    country: obj?.country || '',
    timezone: obj?.timezone || '',
    message
  };
};

const convertData = (
  urlDataList: IUrlLocation[] = [],
  locationId: TLocationId
): IAppLocation[] => {
  let result: IAppLocation[] = [];
  if (!Array.isArray(urlDataList)) {
    return result;
  }
  const myLocation = convertIdToObject(locationId); // converts users location
  const list = urlDataList.map(urlData =>
    convertIdToObject(urlData['id'], urlData['message'])
  );
  result = list.map(location => {
    if (locationId === (location as IAppLocation)['id']) {
      return {
        ...location,
        host: true,
        offset: { hours: 0, minutes: 0 }
      };
    }
    return {
      ...location,
      host: false,
      offset: findOffset(myLocation?.timezone, location?.timezone)
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
