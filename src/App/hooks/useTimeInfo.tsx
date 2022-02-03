import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment-timezone';

import { TIME_FORMAT } from '../redux/constants';

import { ILocation, IInitialState } from '../redux/types';

const useTimeInfo = (location?: ILocation) => {
  const { t } = useTranslation();

  const { userLocation, timeFormat, additionalHours, planningMode } = useSelector(
    (state: IInitialState) => state
  );

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

  // Adding additional hours
  const tempDate = {
    hours: parseInt(visiableTime[0]),
    minutes: parseInt(visiableTime[1]),
    suffix: visiableTime[2].substring(3),
    day: date.getDay()
  };

  if (planningMode) {
    const integerAdditionalHours =
      additionalHours < 0 ? Math.ceil(additionalHours) : Math.floor(additionalHours);
    const additionalMinutes = 60 * (additionalHours - integerAdditionalHours);
    const tempMinutes = tempDate.minutes + additionalMinutes;
    const hoursBefore = tempDate.hours + integerAdditionalHours;

    // Setting the right minutes
    if (tempMinutes > 60) {
      tempDate.hours += 1;
      tempDate.minutes = tempMinutes - 60;
    } else if (tempMinutes === 60) {
      tempDate.hours += 1;
      tempDate.minutes = 0;
    } else if (tempMinutes < 0) {
      if (tempDate.hours === 0) {
        tempDate.hours = 23;
      } else {
        tempDate.hours -= 1;
      }
      tempDate.minutes = 60 + tempMinutes;
    } else {
      tempDate.minutes = tempMinutes;
    }

    // Settings the right hours
    if (isHour12Format) {
      if (tempDate.hours + integerAdditionalHours > 12) {
        tempDate.hours = tempDate.hours + integerAdditionalHours - 12;
      } else if (tempDate.hours + integerAdditionalHours === 12) {
        tempDate.hours = 12;
      } else if (tempDate.hours + integerAdditionalHours < 0) {
        tempDate.hours = 12 + tempDate.hours + integerAdditionalHours;
      } else if (tempDate.hours + integerAdditionalHours === 0) {
        tempDate.hours = 12;
      } else {
        tempDate.hours = tempDate.hours + integerAdditionalHours;
      }
      console.log('after', hoursBefore, tempDate.hours, integerAdditionalHours);

      // Setting right AM/PM
      if (hoursBefore !== tempDate.hours) {
        if ((hoursBefore === 12 || hoursBefore === 0) && tempDate.hours === 11) {
          tempDate.suffix = tempDate.suffix === 'AM' ? 'PM' : 'AM';
        } else if (hoursBefore === 11 && (tempDate.hours === 12 || tempDate.hours === 0)) {
          tempDate.suffix = tempDate.suffix === 'AM' ? 'PM' : 'AM';
        }
      }
    } else {
      if (tempDate.hours + integerAdditionalHours > 24) {
        tempDate.hours = tempDate.hours + integerAdditionalHours - 24;
      } else if (tempDate.hours + integerAdditionalHours === 24) {
        tempDate.hours = 0;
      } else if (tempDate.hours + integerAdditionalHours < 0) {
        tempDate.hours = 24 + tempDate.hours + integerAdditionalHours;
      } else {
        tempDate.hours = tempDate.hours + integerAdditionalHours;
      }
    }
  }

  timeObject.hours = tempDate.hours < 10 ? `0${tempDate.hours}` : `${tempDate.hours}`;
  timeObject.minutes = tempDate.minutes < 10 ? `0${tempDate.minutes}` : `${tempDate.minutes}`;
  timeObject.suffix = tempDate.suffix;

  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    tempDate.day,
    tempDate.hours,
    tempDate.minutes
  );

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
