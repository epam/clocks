import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ILaneBlockProps } from './LaneBlock.types';

import style from './LaneBlock.module.scss';

import generateTime from '../../../../utils/generateTime';
import useTimeInfo from '../../../../hooks/useTimeInfo';
import useTheme from '../../../../hooks/useTheme';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { IInitialState } from '../../../../redux/types';
import clsx from 'clsx';

const LaneBlock: React.FC<ILaneBlockProps> = ({ location }) => {
  const {
    locations: { userLocation }
  } = useSelector((state: IInitialState) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  const timeInfo = useTimeInfo(location);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

  const userTimeInfo = useTimeInfo(userLocation);
  const activeHour =
    Number(userTimeInfo.minutes) > 30 ? Number(userTimeInfo.hours) + 1 : Number(userTimeInfo.hours);
  const activeMinutes = Number(userTimeInfo.minutes) > 30 ? '00' : '30';
  const activeTime = `${activeHour < 10 ? '0' + activeHour : activeHour}:${activeMinutes}`;

  const timeline = generateTime(24, 30, 0, 23);
  const newTimeline = timeline.map(value => {
    const times = value.split(':');
    const offsetTime = String((timeInfo.offsetTime as number) / 60).split('.');
    let offsetHour = Number(offsetTime[0]);
    let offsetMinute = Number(offsetTime[1]) * (600 / 100);
    if (isNaN(offsetMinute)) {
      offsetMinute = 0;
    }
    let hours = Number(times[0]) + offsetHour;
    let minutes = Number(times[1]) + offsetMinute;
    if (minutes === 60) {
      hours = hours + 1;
      minutes = 0;
    }
    if (hours < 0) {
      hours = hours + 24;
    }
    if (hours > 23) {
      hours = hours - 24;
    }
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 30 ? '00' : '30'}`;
  });

  const activeTimeIndex = timeline.findIndex(value => value === activeTime);
  const isActiveTimeIndex = activeTimeIndex !== -1;

  useEffect(() => {
    if (isActiveTimeIndex) {
      setActiveIndex(activeTimeIndex);
    }
  }, [activeTimeIndex, isActiveTimeIndex]);

  const ref = useRef(null);
  const containerRef = useRef(null);
  if (containerRef !== null) {
    console.dir(containerRef.current);
    console.dir(ref.current);
  }

  const laneBlockContainer = document.getElementById('laneBlockContainer');

  const scroll = (
    ref: { current: { offsetLeft: number } | null },
    containerRef: { current: { offsetLeft: number } | null }
  ) => {
    if (ref.current !== null && laneBlockContainer !== null && containerRef.current !== null) {
      const leftOffset = ref.current.offsetLeft - containerRef.current.offsetLeft;
      laneBlockContainer.scroll({
        left: leftOffset
      });
    }
  };

  useEffect(() => {
    scroll(ref, containerRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <div className={style.container} ref={containerRef}>
      {newTimeline.map((value, index) => {
        const time = value.split(':');
        const hour = Number(time[0]);
        return (
          <div
            key={nanoid()}
            ref={index === activeIndex && isUserLocation ? ref : null}
            className={clsx({
              [bodyTheme]: true,
              [style.activeTime]: index === activeIndex,
              [style.nonWorkHours]: hour >= 20 || hour <= 7
            })}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
};

export default LaneBlock;
