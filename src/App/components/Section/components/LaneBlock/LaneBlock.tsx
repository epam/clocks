import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import useTimeInfo from '../../../../hooks/useTimeInfo';
import useTheme from '../../../../hooks/useTheme';

import generateTime from '../../../../utils/generateTime';
import generateTimeTable from '../../../../utils/generateTimeTable';

import { ILaneBlockProps } from './LaneBlock.types';
import { IInitialState } from '../../../../redux/types';

import style from './LaneBlock.module.scss';

const LaneBlock: React.FC<ILaneBlockProps> = ({ location }) => {
  const {
    deleteMode,
    counter,
    settings,
    locations: { userLocation }
  } = useSelector((state: IInitialState) => state);
  const [activeIndex, setActiveIndex] = useState(0);

  const timeInfo = useTimeInfo(location);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const nonWorkingHours = useTheme(style.nonWorkHoursLight, style.nonWorkHoursDark);
  const onClickStyle = useTheme(style.clickLight, style.clickDark);
  const hoverStyle = useTheme(style.hoverLight, style.hoverDark);
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
  const newTimeline = useMemo(() => generateTimeTable(timeInfo, 24, 30, 0, 23), [timeInfo]);

  const activeTimeIndex = timeline.findIndex(value => value === activeTime);
  const isActiveTimeIndex = activeTimeIndex !== -1;
  useEffect(() => {
    if (isActiveTimeIndex) {
      setActiveIndex(activeTimeIndex - 1);
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
    if (!deleteMode.isOn) {
      // @ts-ignore
      containerRef.current.parentNode.childNodes.forEach((elem: any) => {
        if (state) {
          elem.children[e._targetInst.index].classList.add(hoverStyle);
        } else {
          elem.children[e._targetInst.index].classList.remove(hoverStyle);
        }
      });
    }
  };

  const onMouseClick = (index: number) => {
    if (containerRef.current) {
      // @ts-ignore
      containerRef.current.parentNode.childNodes.forEach((elem: any) => {
        elem.childNodes.forEach((el: HTMLDivElement, idx: number) => {
          if (idx === index) {
            el.classList.toggle(onClickStyle);
          } else {
            if (el.classList.contains(onClickStyle)) {
              el.classList.remove(onClickStyle);
            }
          }
        });
      });
    }
  };

  useEffect(() => {
    const clkItm = window.sessionStorage.getItem('clkItm');
    if (clkItm) {
      const clickItem = JSON.parse(clkItm);
      if (containerRef.current) {
        // @ts-ignore
        containerRef.current.parentNode.childNodes.forEach((elem: any) => {
          elem.childNodes.forEach((el: HTMLDivElement, idx: number) => {
            if (idx === clickItem) {
              el.classList.add(onClickStyle);
            }
          });
        });
      }
    }
  }, [counter, settings, deleteMode, newTimeline]);

  useEffect(() => {
    scroll(ref, containerRef);
    // don't need as a dependency scroll
    // eslint-disable-next-line
  }, [activeIndex]);

  const currentLocation = location && location?.city + location?.lat;
  const locationBlock = document.getElementById(currentLocation as string);
  const height = locationBlock === null ? '' : locationBlock.offsetHeight;

  const setSessionClick = (index: number) => {
    const getClick = window.sessionStorage.getItem('clkItm');
    const clickItem = getClick && JSON.parse(getClick) === index ? -1 : index;
    window.sessionStorage.setItem('clkItm', JSON.stringify(clickItem));
  };

  return (
    <div className={style.container} ref={containerRef}>
      {newTimeline.map((value, index) => {
        const time = value.split(':');
        const hour = Number(time[0]);
        return (
          <div
            style={{ height: isMobileView ? 'auto' : height }}
            key={nanoid()}
            ref={index === activeIndex && isUserLocation ? ref : null}
            onMouseEnter={e => onMouseOver(e, 1)}
            onMouseLeave={e => onMouseOver(e, 0)}
            onClick={() => {
              onMouseClick(index);
              setSessionClick(index);
            }}
            className={clsx({
              [bodyTheme]: true,
              [style.activeTime]: index === activeIndex,
              [style.disabledDelete]: deleteMode.isOn && isUserLocation,
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
