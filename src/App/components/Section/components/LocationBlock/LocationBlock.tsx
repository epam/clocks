import React, { useState, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import { Remove } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useLocations from '../../../../hooks/useLocations';
import { IInitialState } from '../../../../redux/types';

import style from './LocationBlock.module.scss';
import { ILocationBlockProps } from './LocationBlock.types';
import CommentButton from './components/CommentButton/CommentButton';
import TimeInfo from './components/TimeInfo/TimeInfo';
import PinButton from './components/PinButton/PinButton';
import useTimeInfo from '../../../../hooks/useTimeInfo';
import { setTimeTable } from '../../../../redux/actions';
import useFlag from '../../../../hooks/useFlag/useFlag';
import { COUNTRYFLAG } from '../../../../redux/constants';

const LocationBlock: React.FC<ILocationBlockProps> = ({ location, urlUserLocation, index }) => {
  const dispatch = useDispatch();
  const timeInfo = useTimeInfo(location);
  const { locations, setLocations } = useLocations();
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const {
    deleteMode,
    onboarding,
    planningMode,
    laneMode,
    locations: { userLocation }
  } = useSelector((state: IInitialState) => state);
  const { showFlagAndCountry } = useSelector((state: IInitialState) => state.settings);
  const flag = useFlag();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

  const displayFladAndCountry = (showFlagAndCountry: string) => {
    switch (showFlagAndCountry) {
      case COUNTRYFLAG.hide:
        return;
      case COUNTRYFLAG.flag:
        return <span className={style.flagContainer}>{flag(location?.iso2 || '')}</span>;
      case COUNTRYFLAG.country:
        return location?.country;
      case COUNTRYFLAG.flagAndCountry:
        return (
          <>
            <span className={style.flagContainer}>{flag(location?.iso2 || '')}</span>
            <span>{location?.country}</span>
          </>
        );
      default:
        return;
    }
  };

  const handleDelete = () => {
    location && delete locations[location?.city + location?.lat];
    setLocations(locations);
  };

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
  };

  useEffect(() => {
    dispatch(setTimeTable({ ...timeInfo, userLocation: urlUserLocation }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className={style.relativeBlock}>
      <div
        className={clsx({
          [style.container]: true,
          [style.shaking]: deleteMode.isOn,
          [style.onboarding]:
            !index && (onboarding?.planningMode || onboarding?.myLocation || onboarding?.comment),
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
          <div className={style.wrapper}>
            <div className={style.infoBlock}>
              <div
                className={clsx({
                  [style.leftSide]: true,
                  [style.moveLeftOrRight]: !isFocused
                })}
              >
                <div
                  className={clsx({
                    [style.buttonContainer]: true,
                    [style.opaccityBlock]: !isFocused
                  })}
                >
                  <PinButton location={location} index={index} urlUserLocation={urlUserLocation} />
                  <CommentButton location={location} index={index} />
                </div>
                {/* <div className={style.flagContainer}>{displayFlag(showFlagAndCountry)}</div> */}
                <div className={style.infoContainer}>
                  <div className={clsx([style.topInfo, style.truncate])}>{location?.city}</div>
                  <div className={style.bottomInfo}>
                    {displayFladAndCountry(showFlagAndCountry)}
                  </div>
                </div>
              </div>
              <TimeInfo location={location} />
            </div>
          </div>
          {location && locations[location.city + location.lat].comment && (
            <div className={style.commentBlock}>
              {locations[location.city + location.lat].comment}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationBlock;
