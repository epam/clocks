import { FC } from 'react';
import { Typography } from '@material-ui/core';

import { ITimeProps } from './Time.interface';
import styles from './Time.module.scss';

const Time: FC<ITimeProps> = ({ time }) => {
  return (
    <>
      <span className={`${styles.time}`}>
        <Typography variant="h2" className={styles.hour}>
          {time.format('HH')}
        </Typography>
        <Typography variant="h2">{time.format('mm')}</Typography>
      </span>
    </>
  );
};

export default Time;
