import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import { Remove } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useLocations from '../../../../hooks/useLocations';
import { IInitialState } from '../../../../redux/types';

import style from './LocationBlock.module.scss';
import { ILocationBlockProps } from './LocationBlock.types';
import CommentButton from './components/CommentButton/CommentButton';
import TimeInfo from './components/TimeInfo/TimeInfo';
import PinButton from './components/PinButton/PinButton';
import useFlag from '../../../../hooks/useFlag/useFlag';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';

const LocationBlock: React.FC<ILocationBlockProps> = ({ location, urlUserLocation, index }) => {
  const { locations, setLocations } = useLocations();
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const laneModeBodyTheme = useTheme(style.laneModeBodyLight, style.laneModeBodyDark);
  const { width } = useWindowDimensions();
  const isMobileView = width <= 600;

  const {
    deleteMode,
    onboarding,
    laneMode,
    locations: { userLocation }
  } = useSelector((state: IInitialState) => state);
  const { showFlag, showCountry } = useSelector((state: IInitialState) => state.settings);
  const flag = useFlag();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

  const handleDelete = () => {
    location && delete locations[location?.city + location?.lat];
    setLocations(locations);
  };

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
  };

  const leftSideView = (
    <>
      <div
        className={clsx({
          [style.leftSide]: true,
          [style.moveLeftOrRight]: !isFocused && isMobileView && laneMode.isOn
        })}
      >
        <div className={style.infoContainer}>
          <div className={clsx([style.topInfo, style.truncate])}>{location?.city}</div>
          <div className={style.bottomInfo}>
            <span className={style.flagContainer}>
              {showFlag ? flag(location?.iso2 || '') : ''}
            </span>
            <span>{showCountry ? location?.country : ''}</span>
          </div>
        </div>
      </div>
      <TimeInfo location={location} />
      <div
        className={clsx({
          [style.buttonContainer]: true,
          [style.opaccityBlock]: !isFocused
        })}
      >
        <PinButton location={location} index={index} urlUserLocation={urlUserLocation} />
        <CommentButton location={location} index={index} />
      </div>
    </>
  );

  const laneModeMobileLeftSide = (
    <>
      <div
        className={clsx({
          [style.leftSide]: true,
          [style.laneModeMoveLeftOrRight]: !isFocused
        })}
      >
        <div className={style.infoContainer}>
          <div className={clsx([style.topInfo, style.truncate])}>{location?.city}</div>
          <div className={style.bottomInfo}>
            <span className={style.flagContainer}>
              {showFlag ? flag(location?.iso2 || '') : ''}
            </span>
            <span>{showCountry ? location?.country : ''}</span>
          </div>
        </div>
      </div>
      <TimeInfo location={location} />
      <div
        className={clsx({
          [style.buttonContainer]: isFocused,
          [style.buttonContainerHide]: !isFocused
        })}
      >
        <PinButton location={location} index={index} urlUserLocation={urlUserLocation} />
        <CommentButton location={location} index={index} />
      </div>
    </>
  );

  const comment = location && (locations[location.city + location.lat].comment as string);

  return (
    <div className={style.relativeBlock} id={location && location?.city + location?.lat}>
      <div
        className={clsx({
          [style.container]: !laneMode.isOn,
          [style.laneModeContainer]: laneMode.isOn,
          [style.shaking]: deleteMode.isOn,
          [style.onboarding]:
            !index && (onboarding?.laneMode || onboarding?.myLocation || onboarding?.comment),
          [style.zeromargin]: laneMode.isOn
        })}
      >
        <div
          className={clsx({
            [bodyTheme]: true,
            [laneModeBodyTheme]: isMobileView && laneMode.isOn,
            [style.shaking]: deleteMode.isOn,
            [style.currentBody]: urlUserLocation || isUserLocation
          })}
          tabIndex={deleteMode.isOn ? -1 : 0}
          onFocus={focusHandler}
          onBlur={focusHandler}
        >
          {deleteMode.isOn && (
            <IconButton className={style.deleteButton} size="small" onClick={handleDelete}>
              <Remove className={style.icon} />
            </IconButton>
          )}
          <div className={style.wrapper}>
            <div className={laneMode.isOn ? style.laneModeInfoBlock : style.infoBlock}>
              {isMobileView && laneMode.isOn ? laneModeMobileLeftSide : leftSideView}
            </div>
          </div>
          {comment && (
            <div
              className={clsx({
                [style.commentBlock]: true,
                [style.truncate]: true
              })}
            >
              {comment.length > 80 ? (
                <Tooltip title={comment} arrow>
                  <div className={style.commentTooltip}>{comment}</div>
                </Tooltip>
              ) : (
                <div className={style.commentTooltip}>{comment}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationBlock;
