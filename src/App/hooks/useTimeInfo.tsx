import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { TIME_FORMAT } from '../redux/constants';
import { ITimeState } from '../components/Section/components/LocationBlock/LocationBlock.types';
import { IInitialState, ILocation } from '../redux/types';

const useTimeInfo = (location?: ILocation) => {
  const { t } = useTranslation();

  const { userLocation } = useSelector((state: IInitialState) => state.locations);
  const { timeFormat } = useSelector((state: IInitialState) => state.settings);

  const date = new Date();

  const timeObject: ITimeState = {
    hours: '',
    minutes: '',
    day: '',
    offset: '',
    offsetTime: 0,
    suffix: '',
    timezone: location?.timezone,
    city: location?.city
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
      const monthsDB = [
        t('LocationBlock.Jan'),
        t('LocationBlock.Feb'),
        t('LocationBlock.Mar'),
        t('LocationBlock.Apr'),
        t('LocationBlock.May'),
        t('LocationBlock.Jun'),
        t('LocationBlock.Jul'),
        t('LocationBlock.Aug'),
        t('LocationBlock.Sep'),
        t('LocationBlock.Oct'),
        t('LocationBlock.Nov'),
        t('LocationBlock.Dec')
      ];

      const month = monthsDB[Number(widjetLocationDate[0]) - 1];

      if (userLocationDate[0] > widjetLocationDate[0]) {
        return `${widjetLocationDate[1]} ${month}`;
      }
      if (userLocationDate[0] < widjetLocationDate[0]) {
        return `${widjetLocationDate[1]} ${month}`;
      }
      if (userLocationDate[1] > widjetLocationDate[1]) {
        return `${widjetLocationDate[1]} ${month}`;
      }
      if (userLocationDate[1] < widjetLocationDate[1]) {
        return `${widjetLocationDate[1]} ${month}`;
      }
      if (userLocation.city === location.city) {
        return `${widjetLocationDate[1]} ${month}`;
      }

      return '';
    };

    const userLocationOffset = moment().tz(userLocation.timezone).utcOffset();
    const widjetLocationOffset = moment().tz(location.timezone).utcOffset();

    const getMinusPlus = () => {
      if (userLocationOffset > widjetLocationOffset) {
        return '–';
      }
      if (userLocationOffset < widjetLocationOffset) {
        return '+';
      }
      return '';
    };

    const getTimeDifference = () => {
      const difference = Math.abs(widjetLocationOffset - userLocationOffset);

      if (difference === 0) {
        return '';
      }
      if (difference < 60) {
        return `${difference}`;
      }
      if (difference % 60 !== 0) {
        const time = String(difference / 60).split('.');
        const hours = Number(time[0]);
        const minutes = (60 / 100) * Number(time[1]);

        return `${hours}:${minutes === 3 ? 30 : minutes}`;
      }

      return `${difference / 60}:00`;
    };

    timeObject.offset = `${getDay()}, ${getMinusPlus()}${getTimeDifference()}`;

    if (getTimeDifference() === '') {
      timeObject.offset = `${getDay()}`;
    }

    if (getDay() === '') {
      timeObject.offset = `${getMinusPlus()}${getTimeDifference()}`;
    }

    if (getTimeDifference() === '' && getDay() === '') {
      timeObject.offset = ``;
    }

    timeObject.offsetTime = widjetLocationOffset - userLocationOffset;

    return timeObject;
  }

  return timeObject;
};

export default useTimeInfo;
