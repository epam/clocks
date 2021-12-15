import { FC, useContext } from 'react';
import clsx from 'clsx';

import { ThemeContext } from '../../context/theme';
import { ILocationOffsetsProps } from './LocationOffsets.interface';

import styles from './LocationOffsets.module.scss';

const LocationOffsets: FC<ILocationOffsetsProps> = ({
  hours,
  minutes,
  host
}) => {
  const {
    state: { type }
  } = useContext(ThemeContext);
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
    return (
      <div
        className={clsx(
          { [styles.hostLight]: type === 'light' },
          { [styles.hostDark]: type === 'dark' }
        )}
      >
        You are here
      </div>
    );
  }

  return (
    <div className={styles.text}>
      {!strHour ? 'Same Time' : `${sign} ${strHour} ${strMinute}`}
    </div>
  );
};

export default LocationOffsets;
