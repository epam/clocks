import React, { useState, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { IconButton, Dialog, Button } from '@mui/material';
import { FmdGoodOutlined, CommentOutlined, Remove } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useTimeInfo from '../../../../hooks/useTimeInfo';
import useLocations from '../../../../hooks/useLocations';
import { setUserLocation } from '../../../../redux/actions';
import { IInitialState, IUrlLocation } from '../../../../redux/types';

import style from './LocationBlock.module.scss';
import { ILocationBlockProps, ITimeState } from './LocationBlock.types';

const LocationBlock: React.FC<ILocationBlockProps> = ({ location, urlUserLocation }) => {
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const commentModalTheme = useTheme(style.lightCommentModal, style.darkCommentModal);

  const { t } = useTranslation();

  const { showDate, showCountry, showTimezone, timeFormat } = useSelector(
    (state: IInitialState) => state.settings
  );
  const { deleteMode, counter } = useSelector((state: IInitialState) => state);
  const { userLocation } = useSelector((state: IInitialState) => state.locations);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const timeInfo = useTimeInfo(location);

  const dispatch = useDispatch();

  const { locations, setLocations } = useLocations();

  const [commentModal, setCommentModal] = useState(false);

  const [inputText, setInputText] = useState<string>('');

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
    if (location && locations[location.city + location.lat].comment) {
      setInputText(locations[location.city + location.lat].comment || '');
    }
    // use it only when component mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTime(timeInfo);
    // don't need as a dependency timeInfo
    // eslint-disable-next-line
  }, [counter, userLocation, locations, timeFormat]);

  const handleDelete = () => {
    location && delete locations[location?.city + location?.lat];
    setLocations(locations);
  };

  const handleSetUserLocation = () => {
    location && dispatch(setUserLocation(location));
    Object.values(locations).forEach((urlLocation: IUrlLocation) => {
      if (urlLocation.city === location?.city && urlLocation.lat === location?.lat) {
        urlLocation.userLocation = true;
      } else {
        urlLocation.userLocation = false;
      }
    });
    setLocations(locations);
  };

  const handleOpenCommentModal = () => {
    setCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModal(false);
  };

  const handleSaveComment = () => {
    Object.values(locations).forEach((urlLocation: any) => {
      if (urlLocation.city === location?.city && urlLocation.lat === location?.lat) {
        urlLocation.comment = inputText;
      }
    });
    setLocations(locations);
    handleCloseCommentModal();
  };

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
  };

  return (
    <>
      <div
        className={clsx({
          [bodyTheme]: true,
          [style.shaking]: deleteMode.isOn,
          [style.currentBody]: urlUserLocation || isUserLocation
        })}
        tabIndex={0}
        onFocus={focusHandler}
        onBlur={focusHandler}
      >
        {deleteMode.isOn && (
          <IconButton className={style.deleteButton} size="small" onClick={handleDelete}>
            <Remove className={style.icon} />
          </IconButton>
        )}
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
              <IconButton
                tabIndex={-1}
                size="small"
                onClick={handleSetUserLocation}
                disabled={deleteMode.isOn}
              >
                <FmdGoodOutlined
                  className={clsx({
                    [iconTheme]: true,
                    [style.blueIcon]: urlUserLocation || isUserLocation,
                    [style.disabledIcon]: deleteMode.isOn
                  })}
                />
              </IconButton>
              <IconButton
                tabIndex={-1}
                size="small"
                onClick={handleOpenCommentModal}
                disabled={deleteMode.isOn}
              >
                <CommentOutlined
                  className={clsx({ [iconTheme]: true, [style.disabledIcon]: deleteMode.isOn })}
                />
              </IconButton>
            </div>
            <div className={style.infoContainer}>
              <div className={style.topInfo}>{location?.city}</div>
              <div className={style.bottomInfo}>{showCountry && location?.country}</div>
            </div>
          </div>
          <div className={style.rightSide}>
            <div className={style.topInfo}>
              {time.hours}:{time.minutes} {time.suffix}
            </div>
            <div className={style.bottomInfo}>
              <div>{showDate && time.offset && `${time.day} ${time.offset}`}</div>
              <div>{showTimezone && time.timezone}</div>
            </div>
          </div>
        </div>
        {location && locations[location.city + location.lat].comment && (
          <div className={style.commentBlock}>
            {locations[location.city + location.lat].comment}
          </div>
        )}
      </div>

      {commentModal && (
        <Dialog open={commentModal} onClose={handleCloseCommentModal}>
          <div className={commentModalTheme}>
            <div className={style.modalTitle}>{t('LocationBlock.CommentModalTitle')}</div>
            <div>
              <input
                className={style.input}
                maxLength={50}
                placeholder={t('LocationBlock.CommentModalInputPlaceholder')}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                autoFocus={true}
              />
            </div>
            <div className={style.buttonContainer}>
              <Button className={style.button} onClick={handleCloseCommentModal}>
                {t('Settings.CancelButton')}
              </Button>
              <Button className={style.button} onClick={handleSaveComment}>
                {t('Settings.SaveButton')}
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default LocationBlock;
