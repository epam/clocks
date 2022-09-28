import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import { Remove } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useLocations from '../../../../hooks/useLocations';
import { IInitialState } from '../../../../redux/types';

import style from './LocationBlock.module.scss';
import { ILocationBlockProps, ITimeState } from './LocationBlock.types';
import CommentButton from './components/CommentButton/CommentButton';
import TimeInfo from './components/TimeInfo/TimeInfo';
import PinButton from './components/PinButton/PinButton';
import generateTime from '../../../../utils/generateTime';
import useTimeInfo from '../../../../hooks/useTimeInfo';

const LocationBlock: React.FC<ILocationBlockProps> = ({ location, urlUserLocation, index }) => {
  const [time, setTime] = useState<ITimeState>({
    hours: '',
    minutes: '',
    day: undefined,
    offset: undefined,
    suffix: '',
    timezone: ''
  });
  const timeInfo = useTimeInfo(location);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const { showCountry } = useSelector((state: IInitialState) => state.settings);
  const { deleteMode, onboarding, planningMode, laneMode } = useSelector(
    (state: IInitialState) => state
  );
  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  const { locations, setLocations } = useLocations();

  const times = generateTime(24, 30, +time.hours + 1, 23);

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

  useEffect(() => {
    setTime(timeInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTime(timeInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.relativeBlock}>
      <div
        className={clsx({
          [style.container]: true,
          [style.shaking]: deleteMode.isOn,
          [style.onboarding]:
            !index && (onboarding?.planningMode || onboarding?.myLocation || onboarding?.comment),
          [style.zeromargin]: laneMode.isOn,
          [style.zeromargin]: laneMode.isOn
        })}
      >
        <div
          className={clsx({
            [bodyTheme]: true,
            [style.shaking]: deleteMode.isOn,
            [style.currentBody]: urlUserLocation || isUserLocation,
            [style.marginRight]: planningMode.isOn
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
          <div
            className={clsx({
              [style.wrapper]: true
            })}
          >
            <div
              className={clsx({
                [style.infoBlock]: true
              })}
            >
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
                  <CommentButton location={location} index={index} />
                </div>
                <div className={style.infoContainer}>
                  <div className={clsx([style.topInfo, style.truncate])}>{location?.city}</div>
                  <div className={style.bottomInfo}>{showCountry && location?.country}</div>
                </div>
              </div>

              <TimeInfo location={location} />
            </div>
            {location && locations[location.city + location.lat].comment && (
              <div className={style.commentBlock}>
                {locations[location.city + location.lat].comment}
              </div>
            )}
          </div>
          {laneMode.isOn && (
            <div className={style.timeTable}>
              {times.map((time, index) => (
                <div
                  key={index}
                  className={clsx({
                    [style.time]: true
                  })}
                >
                  {time}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationBlock;
