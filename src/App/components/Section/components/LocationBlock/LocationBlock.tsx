import React, { useState, useEffect, useMemo, DragEvent, useRef, RefObject } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import useTheme from '../../../../hooks/useTheme';
import useTimeInfo from '../../../../hooks/useTimeInfo';
import useLocations from '../../../../hooks/useLocations';
import { IInitialState } from '../../../../redux/types';
import addClassName from '../../../../utils/addClassName';
import removeClassName from '../../../../utils/removeClassName';
import generateLocationKey from '../../../../utils/generateLocationKey';

import style from './LocationBlock.module.scss';
import { ILocationBlockProps, ITimeState } from './LocationBlock.types';
import PinButton from './components/PinButton/PinButton';
import DeleteButton from './components/DeleteButton/DeleteButton';
import CommentModal from './components/CommentModal/CommentModal';
import CommentButton from './components/CommentButton/CommentButton';

const LocationBlock: React.FC<ILocationBlockProps> = ({
  location,
  urlUserLocation,
  selectedLocation,
  setSelectedLocation,
  index
}) => {
  console.log('🚀 ~ file: LocationBlock.tsx ~ line 26 ~ selectedLocation', selectedLocation);

  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const containerDivRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);

  const { showDate, showCountry, showTimezone, timeFormat } = useSelector(
    (state: IInitialState) => state.settings
  );
  const { deleteMode, counter, onboarding, dragDropMode, planningMode } = useSelector(
    (state: IInitialState) => state
  );
  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  const timeInfo = useTimeInfo(location);

  const { locations, dragAndDropLocation } = useLocations();

  const [commentModal, setCommentModal] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [time, setTime] = useState<ITimeState>({
    hours: '',
    minutes: '',
    day: undefined,
    offset: undefined,
    suffix: '',
    timezone: ''
  });

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

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

  const handleOpenCommentModal = () => {
    setCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModal(false);
  };

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
  };

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    if (dragDropMode && location) {
      setTimeout(() => {
        setSelectedLocation(location);
        addClassName(containerDivRef, style.hide);
      });
    }
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    removeClassName(rightBlockRef, style.bgGray);

    if (selectedLocation && location) {
      dragAndDropLocation(selectedLocation, location);
    }
  };

  const blockDragEnterHandler = (blockRef: RefObject<HTMLDivElement>) => {
    if (!selectedLocation || !location) {
      throw new Error('Dragged location or dropped block location is null');
    }
    const selectedLocationKey = generateLocationKey(selectedLocation);
    const currentLocationKey = generateLocationKey(location);
    if (selectedLocationKey !== currentLocationKey) {
      addClassName(blockRef, style.bgGray);
    }
  };

  const dragLeaveHandler = (blockRef: RefObject<HTMLDivElement>) => {
    removeClassName(blockRef, style.bgGray);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    removeClassName(containerDivRef, style.hide);
    setSelectedLocation(null);
  };

  return (
    <div className={style.relativeBlock}>
      <div
        className={clsx({
          [style.container]: true,
          [style.shaking]: deleteMode.isOn,
          [style.onboarding]:
            !index && (onboarding?.dragDropMode || onboarding?.myLocation || onboarding?.comment)
        })}
        draggable={dragDropMode.isOn}
        onDragOver={e => e.preventDefault()}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
      >
        <div
          ref={containerDivRef}
          className={clsx({
            [bodyTheme]: true,
            [style.shaking]: deleteMode.isOn || dragDropMode.isOn,
            [style.currentBody]: urlUserLocation || isUserLocation,
            [style.marginRight]: planningMode.isOn,
            [style.dragDropCursor]: dragDropMode.isOn
          })}
          tabIndex={deleteMode.isOn ? -1 : 0}
          onFocus={focusHandler}
          onBlur={focusHandler}
        >
          {deleteMode.isOn && <DeleteButton location={location} />}

          <div className={style.infoBlock}>
            <div
              className={clsx({
                [style.leftSide]: true,
                [style.moveLeftOrRight]: !isFocused && !isUserLocation
              })}
            >
              <div
                className={clsx({
                  [style.buttonContainer]: true,
                  [style.opaccityBlock]: !isFocused && !isUserLocation
                })}
              >
                <PinButton location={location} index={index} urlUserLocation={urlUserLocation} />
                <CommentButton index={index} openCommentModal={handleOpenCommentModal} />
              </div>
              <div className={style.infoContainer}>
                <div className={style.topInfo}>{location?.city}</div>
                <div className={style.bottomInfo}>{showCountry && location?.country}</div>
              </div>
            </div>
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
          </div>
          {location && locations[location.city + location.lat].comment && (
            <div className={style.commentBlock}>
              {locations[location.city + location.lat].comment}
            </div>
          )}
        </div>
      </div>

      {commentModal && (
        <CommentModal
          commentModal={commentModal}
          handleClose={handleCloseCommentModal}
          location={location}
        />
      )}

      <div
        ref={rightBlockRef}
        className={clsx({
          [style.rightBlock]: true,
          [style.behind]: selectedLocation === null
        })}
        draggable={dragDropMode.isOn}
        onDragEnter={_ => blockDragEnterHandler(rightBlockRef)}
        onDragLeave={_ => dragLeaveHandler(rightBlockRef)}
        onDragOver={e => e.preventDefault()}
        onDrop={dropHandler}
      >
        <div className={style.innerBlock} />
      </div>
    </div>
  );
};

export default LocationBlock;
