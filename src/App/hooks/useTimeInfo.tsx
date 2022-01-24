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
    offset: '',
    meridiem: ''
  };

  const locationTime = date
    .toLocaleTimeString('ru-RU', { timeZone: location?.timezone })
    .split(':');

  const locationDate = date
    .toLocaleDateString('en-US', { timeZone: location?.timezone })
    .split('/');

  const locationHours = Number(locationTime[0]);
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
    const userLocationDay = Number(userLocationDate[1]);
    const userLocationMonth = Number(userLocationDate[0]);

    const getMinutes = () => {
      const minuteDiffrence = Math.abs(Number(locationTime[1]) - Number(userLocationTime[1]));

      return minuteDiffrence ? `:${minuteDiffrence} ` : ' ';
    };

    if (userLocationMonth === locationMonth) {
      if (userLocationDay > locationDay) {
        timeObject.day = t('LocationBlock.Yesteday');
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
      }
      if (userLocationDay === locationDay && userLocationHours < locationHours) {
        timeObject.day = t('LocationBlock.Today');
        timeObject.offset =
          locationHours - userLocationHours + getMinutes() + t('LocationBlock.Ahead');
      }
      if (userLocationDay < locationDay && userLocationHours > locationHours) {
        timeObject.day = t('LocationBlock.Tommorow');
        timeObject.offset =
          24 - userLocationHours + locationHours + getMinutes() + t('LocationBlock.Ahead');
      }
    } else {
      if (userLocationDay < locationDay && userLocationMonth > locationMonth) {
        timeObject.day = t('LocationBlock.Yesteday');
        timeObject.offset =
          24 - userLocationHours + locationHours + getMinutes() + t('LocationBlock.Ahead');
      }
      if (userLocationDay > locationDay && userLocationMonth < locationMonth) {
        timeObject.day = t('LocationBlock.Tommorow');
        timeObject.offset =
          24 - locationHours + userLocationHours + getMinutes() + t('LocationBlock.Behind');
      }
    }

    return timeObject;
  }

  return timeObject;
};

export default useTimeInfo;
