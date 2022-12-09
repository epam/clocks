import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import useLocations from '../../../../../../hooks/useLocations';
import useTimeInfo from '../../../../../../hooks/useTimeInfo';
import { IInitialState } from '../../../../../../redux/types';
import { ITimeState } from '../../LocationBlock.types';
import useCountryToAbbreviation from '../../../../../../hooks/useCountryToAbbreviation';

import style from './TimeInfo.module.scss';
import { ITimeInfoProps } from './TimeInfo.types';

const TimeInfo: React.FC<ITimeInfoProps> = ({ location }) => {
  const [time, setTime] = useState<ITimeState>({
    hours: '',
    minutes: '',
    day: undefined,
    offset: undefined,
    suffix: '',
    timezone: ''
  });

  const abbreviation = useCountryToAbbreviation(time.timezone);
  const timeInfo = useTimeInfo(location);
  const { locations } = useLocations();

  const { counter, laneMode } = useSelector((state: IInitialState) => state);
  const { showDate, showTimezone, timeFormat } = useSelector(
    (state: IInitialState) => state.settings
  );
  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  useEffect(() => {
    setTime(timeInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, userLocation, locations, timeFormat]);

  return (
    <>
      <div className={laneMode.isOn ? style.laneModeRightSide : style.rightSide}>
        <div className={clsx(style.timeInfo)}>
          {time.hours}:{time.minutes} {time.suffix}
        </div>
        <div className={style.bottomInfo}>
          <div>
            {showDate && time.offset && `${time.offset}`}
            <span>{showTimezone && !showDate && `${abbreviation}`}</span>
            <span>{showTimezone && showDate && time.offset !== '' && `, ${abbreviation}`}</span>
            <span>{showTimezone && showDate && time.offset === '' && `${abbreviation}`}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeInfo;
