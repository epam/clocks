import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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

  if (userLocation) {
    const locationTime = date
      .toLocaleTimeString('ru-RU', {
        timeZone: location?.timezone
      })
      .split(':');

    const locationDate = date
      .toLocaleDateString('en-US', { timeZone: location?.timezone })
      .split('/');

    const locationHours = Number(locationTime[0]);
    const locationMinutes = Number(locationTime[1]);
    const locationDay = Number(locationDate[1]);
    const locationMonth = Number(locationDate[0]);

    const userLocationTime = date
      .toLocaleTimeString('ru-RU', {
        timeZone: userLocation?.timezone
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
