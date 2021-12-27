import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { ThemeContext } from '../../../../context/theme';
import { ILocationOffsetsProps } from './LocationOffsets.interface';

import styles from './LocationOffsets.module.scss';

const LocationOffsets: FC<ILocationOffsetsProps> = ({
  hours,
  minutes,
  host
}) => {
  const { t } = useTranslation();
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
        {t('location.here')}
      </div>
    );
  }

  return (
    <div className={styles.text}>
      {!strHour ? t('location.sameTime') : `${sign} ${strHour} ${strMinute}`}
    </div>
  );
};

export default LocationOffsets;
