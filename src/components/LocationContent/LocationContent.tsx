import { useMemo, useState, useEffect, FC } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment-timezone';

import LocationOffsets from '../LocationOffsets';
import { EpamColors } from '../../constants';
import { getGmtOffset } from '../../handlers';
import { ILocationContentProps } from './LocationContent.interface';

import styles from './LocationContent.module.scss';

const useStyle = makeStyles(theme => ({
  grey: {
    color: theme.palette.grey[300]
  },
  mt15: {
    marginTop: '15px'
  },
  default: {
    color: theme.palette.text.primary,
    textAlign: 'center'
  },
  time: {
    color: theme.palette.type === 'light' ? EpamColors.darkGray : 'white',
    display: 'flex'
  },
  hour: {
    '&::after': {
      content: '":"',
      position: 'relative',
      top: '-.1em',
      margin: '0 6px'
    }
  },
  cityCountry: {
    color: theme.palette.type === 'light' ? EpamColors.darkGray : 'white',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  m0: {
    margin: 0
  }
}));

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
  const css = useStyle();
  const [time, setTime] = useState(moment.tz(timezone));

  useEffect(() => {
    const id = setInterval(() => setTime(moment.tz(timezone)), 1000);

    return () => clearInterval(id);
  }, [timezone]);

  const gmtOffset = useMemo(() => getGmtOffset(timezone), [timezone]);

  return (
    <div className={styles.locationContent}>
      <div className={styles['date-and-time']}>
        {hasDate && (
          <Typography
            paragraph
            variant="subtitle2"
            data-testid="date"
            className={`${css.default} ${css.m0}`}
          >
            {time.format('D MMM').toUpperCase()}
          </Typography>
        )}
        <span className={css.time}>
          <Typography variant="h2" className={css.hour}>
            {time.format('HH')}
          </Typography>
          <Typography variant="h2">{time.format('mm')}</Typography>
        </span>
        <LocationOffsets hours={hours} minutes={minutes} host={host} />
        {hasTimezone && (
          <div className={`${css.grey} ${styles.timezone}`}>
            {timezone} GMT {gmtOffset}
          </div>
        )}
      </div>
      <div className={styles['location']}>
        <Typography className={`${css.mt15} ${css.cityCountry}`} variant="h5">
          {city}
        </Typography>
        {hasCountry && <div className={css.cityCountry}>{country}</div>}
      </div>
    </div>
  );
};

export default LocationContent;
