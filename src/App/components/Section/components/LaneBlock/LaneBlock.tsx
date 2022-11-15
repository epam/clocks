import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

import generateTime from '../../../../utils/generateTime';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import useTimeInfo from '../../../../hooks/useTimeInfo';
import useTheme from '../../../../hooks/useTheme';
import { ILaneBlockProps } from './LaneBlock.types';
import { IInitialState } from '../../../../redux/types';

import style from './LaneBlock.module.scss';

const LaneBlock: React.FC<ILaneBlockProps> = ({ location }) => {
  const {
    locations: { userLocation }
  } = useSelector((state: IInitialState) => state);
  const [activeIndex, setActiveIndex] = useState(0);
  const timeInfo = useTimeInfo(location);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const nonWorkingHours = useTheme(style.nonWorkHoursLight, style.nonWorkHoursDark);
  const { width } = useWindowDimensions();
  const isMobileView = width <= 600;

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
    if (offsetMinute === 450) {
      offsetHour = offsetHour + 1;
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

  const laneBlockContainer = document.getElementById('laneBlockContainer');
  const laneModeViewContainer = document.getElementById('laneModeViewContainer');

  const scroll = (
    ref: { current: { offsetLeft: number; offsetTop: number } | null },
    containerRef: { current: { offsetLeft: number; offsetTop: number } | null }
  ) => {
    if (isMobileView) {
      if (ref.current !== null && laneModeViewContainer !== null && containerRef.current !== null) {
        const topOffset = ref.current.offsetTop - containerRef.current.offsetTop;
        const centerOffset = (window.innerHeight - containerRef.current.offsetTop) / 2;
        laneModeViewContainer.scroll({
          top: topOffset - centerOffset + 60
        });
      }
    }
    if (ref.current !== null && laneBlockContainer !== null && containerRef.current !== null) {
      const leftOffset = ref.current.offsetLeft - containerRef.current.offsetLeft;
      const centerOffset = (window.innerWidth - containerRef.current.offsetLeft) / 2;
      laneBlockContainer.scroll({
        left: leftOffset - centerOffset + 60
      });
    }
  };

  const onMouseOver = (e: any, state: number) => {
    // @ts-ignore
    containerRef.current.parentNode.childNodes.forEach((elem: any) => {
      if (isMobileView) {
        if (state) {
          elem.children[e._targetInst.index].style.borderTop = '0.5px solid #39c2d7';
          elem.children[e._targetInst.index + 1].style.borderTop = '0.5px solid #39c2d7';
          elem.children[e._targetInst.index].style.borderBottom = '0.5px solid #39c2d7';
          elem.children[e._targetInst.index - 1].style.borderBottom = '0.5px solid #39c2d7';
        } else {
          elem.children[e._targetInst.index].style.borderTop = '0.5px solid #bbbbbb';
          elem.children[e._targetInst.index + 1].style.borderTop = '0.5px solid #bbbbbb';
          elem.children[e._targetInst.index].style.borderBottom = '0.5px solid #bbbbbb';
          elem.children[e._targetInst.index - 1].style.borderBottom = '0.5px solid #bbbbbb';
        }
      } else {
        if (state) {
          elem.children[e._targetInst.index].style.borderRight = '0.5px solid #39c2d7';
          elem.children[e._targetInst.index - 1].style.borderRight = '0.5px solid #39c2d7';
          elem.children[e._targetInst.index].style.borderLeft = '0.5px solid #39c2d7';
          elem.children[e._targetInst.index + 1].style.borderLeft = '0.5px solid #39c2d7';
        } else {
          elem.children[e._targetInst.index].style.borderRight = '0.5px solid #bbbbbb';
          elem.children[e._targetInst.index - 1].style.borderRight = '0.5px solid #bbbbbb';
          elem.children[e._targetInst.index].style.borderLeft = '0.5px solid #bbbbbb';
          elem.children[e._targetInst.index + 1].style.borderLeft = '0.5px solid #bbbbbb';
        }
      }
    });
  };

  useEffect(() => {
    scroll(ref, containerRef);
  }, [scroll, activeIndex]);

  return (
    <div className={style.container} ref={containerRef}>
      {newTimeline.map((value, index) => {
        const time = value.split(':');
        const hour = Number(time[0]);
        return (
          <div
            key={nanoid()}
            ref={index === activeIndex && isUserLocation ? ref : null}
            onMouseEnter={e => onMouseOver(e, 1)}
            onMouseLeave={e => onMouseOver(e, 0)}
            className={clsx({
              [bodyTheme]: true,
              [style.activeTime]: index === activeIndex,
              [nonWorkingHours]: hour >= 20 || hour <= 7
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
