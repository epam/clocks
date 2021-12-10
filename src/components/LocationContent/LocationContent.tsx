import { useMemo, useState, useEffect, FC } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import LocationOffsets from '../LocationOffsets';
import { IAppLocation, TCity, TCountry, TTimezone } from '../../types/location';
import { EpamColors } from '../../constants';
import { getGmtOffset } from '../../handlers';
import styles from './LocationContent.module.scss';

interface IProps extends Partial<IAppLocation> {
  city: TCity;
  country: TCountry;
  timezone: TTimezone;
  hours: number;
  minutes: number;
  host: boolean;
}

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
    color: theme.palette.type === 'light' ? EpamColors.darkGray : 'white'
  }
}));

const LocationContent: FC<IProps> = ({
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
            className={`${css.default} m-0`}
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
        {hasCountry && (
          <Typography
            variant="subtitle2"
            className={`${css.cityCountry} text-uppercase text-center`}
          >
            {country}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default LocationContent;
