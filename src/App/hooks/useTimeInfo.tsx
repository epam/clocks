import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ILocation, IInitialState } from '../redux/types';

const useTimeInfo = (location?: ILocation) => {
  const { t } = useTranslation();

  const { userLocation } = useSelector((state: IInitialState) => state);

  const date = new Date();

  const timeObject = {
    hours: '',
    minutes: '',
    day: '',
    offset: ''
  };

  const locationTime = date
    .toLocaleTimeString('ru-RU', { timeZone: location?.timezone })
    .split(':');

  const locationDate = date
    .toLocaleDateString('en-US', { timeZone: location?.timezone })
    .split('/');

  const locationHours = Number(locationTime[0]);
  const locationMinutes = Number(locationTime[1]);
  const locationDay = Number(locationDate[1]);
  const locationMonth = Number(locationDate[0]);

  timeObject.hours = locationTime[0];
  timeObject.minutes = locationTime[1];

  if (userLocation) {
    const userLocationTime = date
      .toLocaleTimeString('ru-RU', { timeZone: userLocation?.timezone })
      .split(':');

    const userLocationDate = date
      .toLocaleDateString('en-US', { timeZone: userLocation?.timezone })
      .split('/');

    const userLocationHours = Number(userLocationTime[0]);
    const userLocationMinutes = Number(userLocationTime[1]);
    const userLocationDay = Number(userLocationDate[1]);
    const userLocationMonth = Number(userLocationDate[0]);

    const getMinutes = () => {
      const difference = userLocationMinutes - locationMinutes;

      if (!difference) {
        return '';
      }

      return difference === 30 ? 30 : 45;
    };

    if (userLocationMonth === locationMonth) {
      if (userLocationDay > locationDay) {
        timeObject.day = t('LocationBlock.Yesterday');
        timeObject.offset = `UTC -${24 - locationHours + userLocationHours}:${getMinutes()}`;
      }
      if (userLocationDay === locationDay) {
        timeObject.day = '';

        const hoursDifference =
          userLocationHours - locationHours === 1 ? 0 : Math.abs(userLocationHours - locationHours);

        if (userLocationHours === locationHours && !getMinutes()) {
          timeObject.offset = t('LocationBlock.Local');
        }
        if (userLocationHours === locationHours && getMinutes()) {
          timeObject.offset = `UTC ${userLocationMinutes > locationMinutes ? '-' : '+'}${
            userLocationHours - locationHours
          }:${getMinutes()}`;
        }
        if (userLocationHours > locationHours && !getMinutes()) {
          timeObject.offset = `UTC -${userLocationHours - locationHours}`;
        }
        if (userLocationHours > locationHours && getMinutes()) {
          if (getMinutes() === 30) {
            timeObject.offset = `UTC -${userLocationHours - locationHours}:${getMinutes()}`;
          }
          if (getMinutes() === 45) {
            timeObject.offset = `UTC -${hoursDifference}:${getMinutes()}`;
          }
        }
        if (userLocationHours < locationHours && !getMinutes()) {
          timeObject.offset = `UTC +${locationHours - userLocationHours}`;
        }
        if (userLocationHours < locationHours && getMinutes()) {
          if (getMinutes() === 30) {
            timeObject.offset = `UTC +${locationHours - userLocationHours}:${getMinutes()}`;
          }
          if (getMinutes() === 45) {
            timeObject.offset = `UTC +${hoursDifference}:${getMinutes()}`;
          }
        }
      }
      if (userLocationDay < locationDay && !getMinutes()) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset = `UTC +${24 - userLocationHours + locationHours}`;
      }
      if (userLocationDay < locationDay && getMinutes()) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset = `UTC +${24 - userLocationHours + locationHours}:${getMinutes()}`;
      }
    } else {
      if (userLocationDay < locationDay && userLocationMonth > locationMonth) {
        timeObject.day = t('LocationBlock.Yesterday');
        timeObject.offset = `UTC -${24 - userLocationHours + locationHours}:${getMinutes()}`;
      }
      if (userLocationDay > locationDay && userLocationMonth < locationMonth) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset = `UTC -${24 - locationHours + userLocationHours}:${getMinutes()}`;
      }
    }

    return timeObject;
  }

  return timeObject;
};

export default useTimeInfo;
