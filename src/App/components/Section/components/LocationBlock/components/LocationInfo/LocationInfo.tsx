import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import useLocations from '../../../../../../hooks/useLocations';
import useTimeInfo from '../../../../../../hooks/useTimeInfo';
import { IInitialState } from '../../../../../../redux/types';
import { ITimeState } from '../../LocationBlock.types';

import style from './LocationInfo.module.scss';
import { ILocationInfoProps } from './LocationInfo.types';

const LocationInfo: React.FC<ILocationInfoProps> = ({ location }) => {
  const { locations } = useLocations();
  const timeInfo = useTimeInfo(location);

  const [time, setTime] = useState<ITimeState>({
    hours: '',
    minutes: '',
    day: undefined,
    offset: undefined,
    suffix: '',
    timezone: ''
  });

  const { planningMode, counter } = useSelector((state: IInitialState) => state);

  const { showDate, showTimezone, timeFormat, showCountry } = useSelector(
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
      <div className={style.locationInfoContainer}>
        <div className={style.infoContainer}>
          <div className={style.topInfo}>{location?.city}</div>
          <div className={style.bottomInfo}>{showCountry && location?.country}</div>
        </div>
        <div className={style.rightSide}>
          <div
            className={clsx(style.timeInfo, {
              [style.planningMode]: planningMode.isOn
            })}
          >
            {time.hours}:{time.minutes} {time.suffix}
          </div>
          <div className={style.timeContainer}>
            <div>{showDate && time.offset && `${time.day} ${time.offset}`}</div>
            <div className={style.timezone}>{showTimezone && time.timezone}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationInfo;
