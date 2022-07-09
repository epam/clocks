import React, { DragEvent, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import DeleteButton from '../DeleteButton/DeleteButton';
import addClassName from '../../../../../../utils/addClassName';
import removeClassName from '../../../../../../utils/removeClassName';
import { IInitialState } from '../../../../../../redux/types';
import useTheme from '../../../../../../hooks/useTheme';
import useLocations from '../../../../../../hooks/useLocations';

import style from '../../LocationBlock.module.scss';
import { ILocationInfoProps } from './LocationInfo.types';
import ButtonContainer from './components/ButtonContainer/ButtonContainer';
import LocationContainer from './components/LocationContainer/LocationContainer';
import TimeContainer from './components/TimeContainer/TimeContainer';

const LocationInfo: React.FC<ILocationInfoProps> = ({
  index,
  urlUserLocation,
  setSelectedLocation,
  location
}) => {
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const containerDivRef = useRef<HTMLDivElement>(null);

  const { locations } = useLocations();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { deleteMode, onboarding, dragDropMode, planningMode } = useSelector(
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

  const dragEndHandler = (e: DragEvent<HTMLDivElement>) => {
    removeClassName(containerDivRef, style.hide);
    setSelectedLocation(null);
  };

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
  };

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
              <ButtonContainer
                location={location}
                index={index}
                urlUserLocation={urlUserLocation}
                isFocused={isFocused}
                isUserLocation={isUserLocation}
              />

              <LocationContainer location={location} />
            </div>

            <TimeContainer location={location} />
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

export default LocationInfo;
