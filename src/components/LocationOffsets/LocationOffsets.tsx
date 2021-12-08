import { FC } from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  host: {
    padding: '1px 8px',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    fontSize: '13px'
  },
  text: {
    color: theme.palette.grey[300]
  }
}));

interface IProps {
  hours: number;
  minutes: number;
  host: boolean;
}

const LocationOffsets: FC<IProps> = ({ hours, minutes, host }) => {
  const css = useStyle();
  const strHour =
    hours !== 0
      ? `${Math.abs(hours)} ${Math.abs(hours) <= 1 ? ' hour ' : ' hours '}`
      : '';
  const strMinute =
    minutes !== 0
      ? `${Math.abs(minutes)} ${
          Math.abs(minutes) <= 1 ? ' minute ' : ' minutes '
        }`
      : '';
  const sign =
    hours < 0 || minutes < 0 ? '-' : hours === 0 && minutes === 0 ? '' : '+';

  if (host) {
    return (
      <Typography variant="subtitle2" className={css.host}>
        You are here
      </Typography>
    );
  }

  return (
    <Typography variant="subtitle2" className={css.text}>
      {!strHour ? (
        'Same Time'
      ) : (
        <>
          {sign}
          {` ${strHour} ${strMinute}`}
        </>
      )}
    </Typography>
  );
};

export default LocationOffsets;
