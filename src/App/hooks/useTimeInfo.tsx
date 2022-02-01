import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';

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

  const visiableTime = date
    .toLocaleTimeString('ru-RU', {
      timeZone: location?.timezone,
      hour12: isHour12Format
    })
    .split(':');

  timeObject.hours = visiableTime[0];
  timeObject.minutes = visiableTime[1];
  timeObject.suffix = visiableTime[2].substring(3);

  if (userLocation && location) {
    const userLocationDate = date
      .toLocaleDateString('en-US', { timeZone: userLocation?.timezone })
      .split('/');
    const widjetLocationDate = date
      .toLocaleDateString('en-US', { timeZone: location?.timezone })
      .split('/');

    const getDay = () => {
      if (userLocationDate[0] > widjetLocationDate[0]) {
        return t('LocationBlock.Yesterday');
      }
      if (userLocationDate[0] < widjetLocationDate[0]) {
        return t('LocationBlock.Tomorrow');
      }
      if (userLocationDate[1] > widjetLocationDate[1]) {
        return t('LocationBlock.Yesterday');
      }
      if (userLocationDate[1] < widjetLocationDate[1]) {
        return t('LocationBlock.Tomorrow');
      }

      return '';
    };

    const userLocationOffset = moment().tz(userLocation.timezone).utcOffset();
    const widjetLocationOffset = moment().tz(location.timezone).utcOffset();

    const getMinusPlus = () => {
      if (userLocationOffset > widjetLocationOffset) {
        return '-';
      }
      if (userLocationOffset < widjetLocationOffset) {
        return '+';
      }
      return '';
    };

    const getTimeDifference = () => {
      const difference = Math.abs(widjetLocationOffset - userLocationOffset);

      if (difference === 0) {
        return t('LocationBlock.Local');
      }
      if (difference < 60) {
        return `${difference} ${t('LocationBlock.Minutes')}`;
      }
      if (difference % 60 !== 0) {
        const time = String(difference / 60).split('.');
        const hours = Number(time[0]);
        const minutes = (60 / 100) * Number(time[1]);

        return `${hours} ${t(hours === 1 ? 'LocationBlock.Hour' : 'LocationBlock.Hours')}
         ${minutes === 3 ? 30 : minutes} ${t('LocationBlock.Minutes')}`;
      }

      const hours = difference / 60;

      return `${hours} ${t(hours === 1 ? 'LocationBlock.Hour' : 'LocationBlock.Hours')}`;
    };

    timeObject.offset = `${getDay()} ${getMinusPlus()}${getTimeDifference()}`;

    return timeObject;
  }

  return timeObject;
};

export default useTimeInfo;
