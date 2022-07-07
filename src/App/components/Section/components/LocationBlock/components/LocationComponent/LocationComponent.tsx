import React, { DragEvent, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import CommentButton from '../CommentButton/CommentButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import PinButton from '../PinButton/PinButton';
import addClassName from '../../../../../../utils/addClassName';
import removeClassName from '../../../../../../utils/removeClassName';
import { IInitialState } from '../../../../../../redux/types';
import useTheme from '../../../../../../hooks/useTheme';
import useLocations from '../../../../../../hooks/useLocations';
import useTimeInfo from '../../../../../../hooks/useTimeInfo';
import CommentModal from '../CommentButton/components/CommentModal/CommentModal';

import style from '../../LocationBlock.module.scss';
import { ILocationComponentProps } from './LocationComponent.types';
import { ITimeState } from '../../LocationBlock.types';

const LocationComponent: React.FC<ILocationComponentProps> = ({
  index,
  urlUserLocation,
  setSelectedLocation,
  location
}) => {
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const containerDivRef = useRef<HTMLDivElement>(null);

  const { locations } = useLocations();

  const timeInfo = useTimeInfo(location);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [time, setTime] = useState<ITimeState>({
    hours: '',
    minutes: '',
    day: undefined,
    offset: undefined,
    suffix: '',
    timezone: ''
  });
  const [commentModal, setCommentModal] = useState(false);

  const { showDate, showCountry, showTimezone, timeFormat } = useSelector(
    (state: IInitialState) => state.settings
  );

  const { deleteMode, counter, onboarding, dragDropMode, planningMode } = useSelector(
    (state: IInitialState) => state
  );
  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

  const dragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    if (dragDropMode && location) {
      setTimeout(() => {
        setSelectedLocation(location);
        addClassName(containerDivRef, style.hide);
      });
    }
  };

  const handleOpenCommentModal = () => {
    setCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModal(false);
  };

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    removeClassName(containerDivRef, style.hide);
    setSelectedLocation(null);
  };

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
  };

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
                <CommentButton
                  children={
                    <CommentModal
                      commentModal={commentModal}
                      handleClose={handleCloseCommentModal}
                      location={location}
                    />
                  }
                  index={index}
                  openCommentModal={handleOpenCommentModal}
                />
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
    </>
  );
};

export default LocationComponent;
