import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TIME_FORMAT } from '../redux/constants';

import { ILocation, IInitialState } from '../redux/types';

const useTimeInfo = (location?: ILocation) => {
  const { t } = useTranslation();

  const { userLocation, timeFormat } = useSelector((state: IInitialState) => state);

  const date = new Date();

  const timeObject = {
    hours: '',
    minutes: '',
    day: '',
    offset: '',
    suffix: ''
  };
  const isHour12Format = timeFormat === TIME_FORMAT.H12;

  const locationTime = date
    .toLocaleTimeString('ru-RU', {
      timeZone: location?.timezone,
      hour12: isHour12Format
    })
    .split(':');

  const locationDate = date
    .toLocaleDateString('en-US', { timeZone: location?.timezone })
    .split('/');

  const locationHours = Number(locationTime[0]);
  const locationMinutes = Number(locationTime[1]);
  const locationDay = Number(locationDate[1]);
  const locationMonth = Number(locationDate[0]);
  const timeSuffix = locationTime[2].substring(3);

  timeObject.hours = locationTime[0];
  timeObject.minutes = locationTime[1];
  timeObject.suffix = timeSuffix;

  if (userLocation) {
    const userLocationTime = date
      .toLocaleTimeString('ru-RU', { timeZone: userLocation?.timezone, hour12: isHour12Format })
      .split(':');

    const userLocationDate = date
      .toLocaleDateString('en-US', { timeZone: userLocation?.timezone })
      .split('/');

    const userLocationHours = Number(userLocationTime[0]);
    const userLocationMinutes = Number(userLocationTime[1]);
    const userLocationDay = Number(userLocationDate[1]);
    const userLocationMonth = Number(userLocationDate[0]);

    const getMinutes = () => {
<<<<<<< HEAD
      const minuteDifference = Math.abs(Number(locationTime[1]) - Number(userLocationTime[1]));

      return minuteDifference ? `:${minuteDifference} ` : ' ';
=======
      const difference = userLocationMinutes - locationMinutes;

      if (!difference) {
        return '';
      }

      return difference === 30 ? 30 : 45;
>>>>>>> main
    };

    if (userLocationMonth === locationMonth) {
      if (userLocationDay > locationDay) {
        timeObject.day = t('LocationBlock.Yesterday');
<<<<<<< HEAD
        timeObject.offset =
          24 - locationHours + userLocationHours + getMinutes() + t('LocationBlock.Behind');
      }
      if (userLocationDay === locationDay && userLocationHours === locationHours) {
        timeObject.day = t('LocationBlock.Today');
        timeObject.offset = t('LocationBlock.Local');
      }
      if (userLocationDay === locationDay && userLocationHours > locationHours) {
        timeObject.day = t('LocationBlock.Today');
        timeObject.offset =
          userLocationHours - locationHours + getMinutes() + t('LocationBlock.Behind');
=======
        timeObject.offset = `UTC -${24 - locationHours + userLocationHours}:${getMinutes()}`;
>>>>>>> main
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
<<<<<<< HEAD
      if (userLocationDay < locationDay && userLocationHours > locationHours) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset =
          24 - userLocationHours + locationHours + getMinutes() + t('LocationBlock.Ahead');
=======
      if (userLocationDay < locationDay) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset = `UTC +${24 - userLocationHours + locationHours}:${getMinutes()}`;
>>>>>>> main
      }
    } else {
      if (userLocationDay < locationDay && userLocationMonth > locationMonth) {
        timeObject.day = t('LocationBlock.Yesterday');
<<<<<<< HEAD
        timeObject.offset =
          24 - userLocationHours + locationHours + getMinutes() + t('LocationBlock.Ahead');
      }
      if (userLocationDay > locationDay && userLocationMonth < locationMonth) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset =
          24 - locationHours + userLocationHours + getMinutes() + t('LocationBlock.Behind');
=======
        timeObject.offset = `UTC -${24 - userLocationHours + locationHours}:${getMinutes()}`;
      }
      if (userLocationDay > locationDay && userLocationMonth < locationMonth) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset = `UTC -${24 - locationHours + userLocationHours}:${getMinutes()}`;
>>>>>>> main
      }
    }

    return timeObject;
  }

  return timeObject;
};

export default useTimeInfo;
