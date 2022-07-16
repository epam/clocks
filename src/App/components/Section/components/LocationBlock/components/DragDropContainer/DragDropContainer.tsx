import React, { DragEvent, RefObject, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import useLocations from '../../../../../../hooks/useLocations';
import useTheme from '../../../../../../hooks/useTheme';
import { IInitialState } from '../../../../../../redux/types';
import addClassName from '../../../../../../utils/addClassName';
import removeClassName from '../../../../../../utils/removeClassName';

import style from './DragDropContainer.module.scss';
import { IDragDropContainerProps } from './DragDropContainer.types';
import generateLocationKey from '../../../../../../utils/generateLocationKey';

const DragDropContainer: React.FC<IDragDropContainerProps> = ({
  index,
  location,
  urlUserLocation,
  setSelectedLocation,
  selectedLocation,
  children
}) => {
  const [DeleteButton, PinButton, CommentButton, LocationInfo] = children;
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const containerDivRef = useRef<HTMLDivElement>(null);
  const rightBlockRef = useRef<HTMLDivElement>(null);

  const { locations, dragAndDropLocation } = useLocations();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { deleteMode, onboarding, dragDropMode, planningMode } = useSelector(
    (state: IInitialState) => state
  );
  const { userLocation } = useSelector((state: IInitialState) => state.locations);
  const { showCountry } = useSelector((state: IInitialState) => state.settings);

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

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    removeClassName(containerDivRef, style.hide);
    setSelectedLocation(null);
  };

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
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

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    removeClassName(rightBlockRef, style.bgGray);

    if (selectedLocation && location) {
      dragAndDropLocation(selectedLocation, location);
    }
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
          {deleteMode.isOn && <>{DeleteButton}</>}
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
                <>{PinButton}</>

                <>{CommentButton}</>
              </div>
              <div className={style.infoContainer}>
                <div className={style.topInfo}>{location?.city}</div>
                <div className={style.bottomInfo}>{showCountry && location?.country}</div>
              </div>
            </div>
            <>{LocationInfo}</>
          </div>
          {location && locations[location.city + location.lat].comment && (
            <div className={style.commentBlock}>
              {locations[location.city + location.lat].comment}
            </div>
          )}
        </div>
      </div>
      {/* <RightBlock selectedLocation={selectedLocation} location={location} /> */}
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

export default DragDropContainer;
