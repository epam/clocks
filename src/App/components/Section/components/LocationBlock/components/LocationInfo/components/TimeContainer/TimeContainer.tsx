import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useSelector } from 'react-redux';
import useLocations from '../../../../../../../../hooks/useLocations';
import useTimeInfo from '../../../../../../../../hooks/useTimeInfo';
import { IInitialState } from '../../../../../../../../redux/types';

import style from '../../../../LocationBlock.module.scss';
import { ITimeContainerProps, ITimeState } from './TimeContainer.types';

const TimeContainer: React.FC<ITimeContainerProps> = ({ location }) => {
  const timeInfo = useTimeInfo(location);
  const { locations } = useLocations();

  const [time, setTime] = useState<ITimeState>({
    hours: '',
    minutes: '',
    day: undefined,
    offset: undefined,
    suffix: '',
    timezone: ''
  });

  const { counter, planningMode } = useSelector((state: IInitialState) => state);
  const { showDate, showTimezone, timeFormat } = useSelector(
    (state: IInitialState) => state.settings
  );
  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  useEffect(() => {
    setTime(timeInfo);
    // don't need as a dependency timeInfo
    // eslint-disable-next-line
  }, [
    counter,
    userLocation,
    locations,
    timeFormat,
    planningMode.additionalHours,
    planningMode.isOn
  ]);
  return (
    <>
      <div className={style.rightSide}>
        <div
          className={clsx(style.timeInfo, {
            [style.planningMode]: planningMode.isOn
          })}
        >
          {time.hours}:{time.minutes} {time.suffix}
        </div>
        <div className={style.bottomInfo}>
          <div>{showDate && time.offset && `${time.day} ${time.offset}`}</div>
          <div className={style.timezone}>{showTimezone && time.timezone}</div>
        </div>
      </div>
    </>
  );
};

export default TimeContainer;
