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
      .toLocaleTimeString('ru-RU', {
        timeZone: userLocation?.timezone,
        hour12: isHour12Format
      })
      .split(':');

    const userLocationDate = date
      .toLocaleDateString('en-US', { timeZone: userLocation?.timezone })
      .split('/');

    const userLocationHours = Number(userLocationTime[0]);
    const userLocationMinutes = Number(userLocationTime[1]);
    const userLocationDay = Number(userLocationDate[1]);
    const userLocationMonth = Number(userLocationDate[0]);

    const getHours = (calculationResult: number) => {
      if (calculationResult === 1) {
        return `${calculationResult} ${t('LocationBlock.Hour')} `;
      }
      if (calculationResult === 0) {
        return '';
      }
      return `${calculationResult} ${t('LocationBlock.Hours')} `;
    };

    const getMinutes =
      userLocationMinutes - locationMinutes
        ? userLocationMinutes - locationMinutes === 30
          ? 30
          : 45
        : '';

    if (userLocationMonth === locationMonth) {
      if (userLocationDay > locationDay) {
        timeObject.day = t('LocationBlock.Yesterday');
        timeObject.offset =
          '-' +
          getHours(24 - locationHours + userLocationHours) +
          getMinutes +
          t('LocationBlock.Minutes');
      }
      if (userLocationDay === locationDay) {
        timeObject.day = '';

        const hoursDifference =
          userLocationHours - locationHours === 1 ? 0 : Math.abs(userLocationHours - locationHours);

        if (userLocationHours === locationHours && !getMinutes) {
          timeObject.offset = t('LocationBlock.Local');
        }
        if (userLocationHours === locationHours && getMinutes) {
          timeObject.offset =
            (userLocationMinutes > locationMinutes ? '-' : '+') +
            getHours(userLocationHours - locationHours) +
            getMinutes +
            t('LocationBlock.Minutes');
        }
        if (userLocationHours > locationHours && !getMinutes) {
          timeObject.offset = '-' + getHours(userLocationHours - locationHours);
        }
        if (userLocationHours > locationHours && getMinutes) {
          if (getMinutes === 30) {
            timeObject.offset =
              '-' +
              getHours(userLocationHours - locationHours) +
              getMinutes +
              t('LocationBlock.Minutes');
          }
          if (getMinutes === 45) {
            timeObject.offset =
              '-' + getHours(hoursDifference) + getMinutes + t('LocationBlock.Minutes');
          }
        }
        if (userLocationHours < locationHours && !getMinutes) {
          timeObject.offset = '+' + getHours(locationHours - userLocationHours);
        }
        if (userLocationHours < locationHours && getMinutes) {
          if (getMinutes === 30) {
            timeObject.offset =
              '+' +
              getHours(locationHours - userLocationHours) +
              getMinutes +
              t('LocationBlock.Minutes');
          }
          if (getMinutes === 45) {
            timeObject.offset =
              '+' + getHours(hoursDifference) + getMinutes + t('LocationBlock.Minutes');
          }
        }
      }
      if (userLocationDay < locationDay && !getMinutes) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset = '+' + getHours(24 - userLocationHours + locationHours);
      }
      if (userLocationDay < locationDay && getMinutes) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset =
          '+' +
          getHours(24 - userLocationHours + locationHours) +
          getMinutes +
          t('LocationBlock.Minutes');
      }
    } else {
      if (userLocationDay < locationDay && userLocationMonth > locationMonth) {
        timeObject.day = t('LocationBlock.Yesterday');
        timeObject.offset =
          '-' +
          getHours(24 - userLocationHours + locationHours) +
          getMinutes +
          t('LocationBlock.Minutes');
      }
      if (userLocationDay > locationDay && userLocationMonth < locationMonth) {
        timeObject.day = t('LocationBlock.Tomorrow');
        timeObject.offset =
          '-' +
          getHours(24 - locationHours + userLocationHours) +
          getMinutes +
          t('LocationBlock.Minutes');
      }
    }

    return timeObject;
  }

  return timeObject;
};

export default useTimeInfo;
