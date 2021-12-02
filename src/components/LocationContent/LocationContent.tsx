import { useMemo, useState, useEffect, FC } from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment-timezone';
import { makeStyles } from '@material-ui/core/styles';
import LocationOffsets from '../LocationOffsets';
import { IAppLocation, TCity, TCountry, TTimezone } from '../../types/location';
import { EpamColors } from '../../constants';
import { getGmtOffset } from '../../handlers';

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
    <>
      {hasDate && (
        <Typography
          paragraph
          variant="subtitle2"
          data-testid="date"
          className={`${css.default} m-0`}
        >
          {time.format('D MMM')}
        </Typography>
      )}
      <span className={css.time}>
        <Typography variant="h2" className={css.hour}>
          {time.format('HH')}
        </Typography>
        <Typography variant="h2">{time.format('mm')}</Typography>
      </span>
      <LocationOffsets hours={hours} minutes={minutes} host={host} />
      <Typography className={css.default} variant="h5">
        {city}
      </Typography>
      {hasCountry && (
        <Typography
          variant="subtitle2"
          className={`${css.grey} text-uppercase text-center`}
        >
          {country}
        </Typography>
      )}
      {hasTimezone && (
        <Typography className={css.default} variant="body2">
          {timezone} GMT {gmtOffset}
        </Typography>
      )}
    </>
  );
};

export default LocationContent;
