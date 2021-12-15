import { useMemo, useState, useEffect, FC, useContext } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import clsx from 'clsx';

import { ThemeContext } from '../../context/theme';
import LocationOffsets from '../LocationOffsets';
import { getGmtOffset } from '../../handlers';
import { ILocationContentProps } from './LocationContent.interface';

import styles from './LocationContent.module.scss';

const LocationContent: FC<ILocationContentProps> = ({
  city = '',
  country = '',
  timezone = '',
  hours,
  minutes,
  host,
  hasCountry = true,
  hasDate = true,
  hasTimezone = true
}) => {
  const [time, setTime] = useState(moment.tz(timezone));

  const {
    state: { type }
  } = useContext(ThemeContext);
  useEffect(() => {
    const id = setInterval(() => setTime(moment.tz(timezone)), 1000);

    return () => clearInterval(id);
  }, [timezone]);

  const gmtOffset = useMemo(() => getGmtOffset(timezone), [timezone]);

  return (
    <div className={styles.locationContent}>
      <div className={styles['date-and-time']}>
        {hasDate && (
          <div
            data-testid="date"
            className={clsx(styles.m0, {
              [styles.defaultLight]: type === 'light',
              [styles.defaultDark]: type === 'dark'
            })}
          >
            {time.format('D MMM').toUpperCase()}
          </div>
        )}
        <span
          className={clsx({
            [styles.timeLight]: type === 'light',
            [styles.timeDark]: type === 'dark'
          })}
        >
          <Typography variant="h2" className={styles.hour}>
            {time.format('HH')}
          </Typography>
          <Typography variant="h2">{time.format('mm')}</Typography>
        </span>
        <LocationOffsets hours={hours} minutes={minutes} host={host} />
        {hasTimezone && (
          <div className={clsx(styles.gray, styles.timezone)}>
            {timezone} GMT {gmtOffset}
          </div>
        )}
      </div>
      <div
        className={clsx(styles['location'], {
          [styles.cityCountryLight]: type === 'light',
          [styles.cityCountryDark]: type === 'dark'
        })}
      >
        <Typography className={styles.mt15} variant="h5">
          {city}
        </Typography>
        {hasCountry && <div>{country}</div>}
      </div>
    </div>
  );
};

export default LocationContent;
