import React, {
  useState,
  useEffect,
  useMemo,
  DragEvent,
  useRef,
  RefObject,
  useCallback
} from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { IconButton, Dialog, Button, Tooltip } from '@mui/material';
import { FmdGoodOutlined, CommentOutlined, Remove } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useTimeInfo from '../../../../hooks/useTimeInfo';
import useLocations from '../../../../hooks/useLocations';
import { setUserLocation } from '../../../../redux/actions';
import { IInitialState, IUrlLocation } from '../../../../redux/types';

import style from './LocationBlock.module.scss';
import { ILocationBlockProps, ITimeState } from './LocationBlock.types';
import Onboarding from '../Onboarding/Onboarding';

import addClassName from '../../../../utils/addClassName';
import removeClassName from '../../../../utils/removeClassName';
import generateLocationKey from '../../../../utils/generateLocationKey';

const LocationBlock: React.FC<ILocationBlockProps> = ({
  location,
  urlUserLocation,
  selectedLocation,
  setSelectedLocation,
  index
}) => {
  console.log('🚀 ~ file: LocationBlock.tsx ~ line 26 ~ selectedLocation', selectedLocation);
  const anchorComment = useRef(null);
  const anchorLocation = useRef(null);

  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const commentModalTheme = useTheme(style.lightCommentModal, style.darkCommentModal);

  const { t } = useTranslation();
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

  const dispatch = useDispatch();

  const { locations, setLocations, dragAndDropLocation } = useLocations();

  const [commentModal, setCommentModal] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
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
  const disabled = useMemo(
    () => deleteMode.isOn || dragDropMode.isOn || planningMode.isOn,
    [planningMode, deleteMode, dragDropMode]
  );

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
  }, [
    counter,
    userLocation,
    locations,
    timeFormat,
    planningMode.additionalHours,
    planningMode.isOn
  ]);

  const handleDelete = () => {
    location && delete locations[location?.city + location?.lat];
    setLocations(locations);
  };

  const renderCommentModal = () => {
    return (
      commentModal && (
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
      )
    );
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

  const locationTooltipText = useMemo(
    (): string => t('LocationBlock.TooltipSetCurrentLocation'),
    [t]
  );
  const commentTooltipText = useMemo((): string => t('LocationBlock.TooltipComment'), [t]);

  return (
    <div className={style.relativeBlock}>
      <div
        className={clsx({
          [style.container]: true,
          [style.shaking]: deleteMode.isOn,
          [style.onboarding]:
            !index && (onboarding?.deleteButton || onboarding?.myLocation || onboarding?.comment)
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
                <Tooltip title={locationTooltipText} arrow>
                  <IconButton
                    ref={anchorLocation}
                    tabIndex={0}
                    size="small"
                    onClick={handleSetUserLocation}
                    disabled={disabled}
                  >
                    <FmdGoodOutlined
                      className={clsx({
                        [iconTheme]: true,
                        [style.blueIcon]: urlUserLocation || isUserLocation,
                        [style.disabledIcon]: disabled
                      })}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title={commentTooltipText} arrow>
                  <IconButton
                    ref={anchorComment}
                    tabIndex={0}
                    size="small"
                    onClick={handleOpenCommentModal}
                    disabled={disabled}
                  >
                    <CommentOutlined
                      className={clsx({
                        [iconTheme]: true,
                        [style.disabledIcon]: disabled
                      })}
                    />
                  </IconButton>
                </Tooltip>
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
      {!index && onboarding?.myLocation && anchorLocation.current && (
        <Onboarding
          open={onboarding.myLocation}
          anchorElement={anchorLocation.current}
          nextElement="comment"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          title={t('Onboarding.LocationTitle')}
          text={t('Onboarding.LocationContent')}
        />
      )}
      {!index && onboarding?.comment && anchorComment.current && (
        <Onboarding
          open={onboarding.comment}
          anchorElement={anchorComment.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          title={t('Onboarding.AddCommentTitle')}
          text={t('Onboarding.AddCommentContent')}
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
      {renderCommentModal()}
    </div>
  );
};

export default LocationBlock;
