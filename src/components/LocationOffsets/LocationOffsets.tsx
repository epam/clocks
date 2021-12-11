import { FC } from 'react';
import { makeStyles } from '@material-ui/core';

import style from './LocationOffsets.module.scss';

const useStyle = makeStyles(theme => ({
  host: {
    padding: '4px 8px',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 20,
    fontSize: '13px',
    width: '100px'
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
      ? `${Math.abs(minutes)} 
      ${Math.abs(minutes) <= 1 ? ' minute ' : ' minutes '}`
      : '';
  const sign =
    hours < 0 || minutes < 0 ? '-' : hours === 0 && minutes === 0 ? '' : '+';

  if (host) {
    return <div className={css.host}>You are here</div>;
  }

  return (
    <div className={style.text}>
      {!strHour ? 'Same Time' : `${sign} ${strHour} ${strMinute}`}
    </div>
  );
};

export default LocationOffsets;
