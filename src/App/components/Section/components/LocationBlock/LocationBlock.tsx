import React, {useState, useEffect, useRef} from 'react';
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
import Onboarding from "../Onboarding/Onboarding";

const LocationBlock: React.FC<ILocationBlockProps> = ({ location, urlUserLocation, index }) => {
  const anchorLocation = useRef(null);
  const anchorComment = useRef(null);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const commentModalTheme = useTheme(style.lightCommentModal, style.darkCommentModal);

  const { t } = useTranslation();

  const { showDate, showCountry, deleteMode, userLocation, counter, onboarding } = useSelector(
    (state: IInitialState) => state
  );

  const timeInfo = useTimeInfo(location);

  const dispatch = useDispatch();

  const { locations, setLocations } = useLocations();

  const [commentModal, setCommentModal] = useState(false);

  const [inputText, setInputText] = useState<string>('');

  const [time, setTime] = useState<ITimeState>({
    hours: '',
    minutes: '',
    day: undefined,
    offset: undefined
  });

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
  }, [counter, userLocation]);

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

  return (
    <>
      <div
        className={clsx({
          [bodyTheme]: true,
          [style.shaking]: deleteMode,
          [style.currentBody]:
            urlUserLocation ||
            (location?.city === userLocation?.city && location?.lat === userLocation?.lat)
        })}
      >
        {deleteMode && (
          <IconButton className={style.deleteButton} size="small" onClick={handleDelete}>
            <Remove className={style.icon} />
          </IconButton>
        )}
        <div className={style.infoBlock}>
          <div className={style.leftSide}>
            <div className={style.buttonContainer}>
              <IconButton ref={anchorLocation} size="small" onClick={handleSetUserLocation} disabled={deleteMode}>
                <FmdGoodOutlined
                  className={clsx({
                    [iconTheme]: true,
                    [style.blueIcon]:
                      urlUserLocation ||
                      (location?.city === userLocation?.city &&
                        location?.lat === userLocation?.lat),
                    [style.disabledIcon]: deleteMode
                  })}
                />
              </IconButton>
              <IconButton ref={anchorComment} size="small" onClick={handleOpenCommentModal} disabled={deleteMode}>
                <CommentOutlined
                  className={clsx({ [iconTheme]: true, [style.disabledIcon]: deleteMode })}
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
              {time.hours}:{time.minutes}
            </div>
            <div className={style.bottomInfo}>
              {showDate && time.day && time.offset && `${time.day}, ${time.offset}`}
            </div>
          </div>
        </div>
        {location && locations[location.city + location.lat].comment && (
          <div className={style.commentBlock}>
            <span className={style.commentText}>{t('LocationBlock.Comment')}</span>
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
      {onboarding?.myLocation && index === 0 && anchorLocation.current && (
          <Onboarding
              open={onboarding.myLocation}
              anchorElement={anchorLocation.current}
              nextElement="comment"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              title="Change location"
              text="By clicking to this button you can change your location"
          />
      )}
      {onboarding?.comment && index === 0 && anchorComment.current && (
          <Onboarding
              open={onboarding.comment}
              anchorElement={anchorComment.current}
              nextElement="shareButton"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              title="Add comment"
              text="By clicking to this button you can add comment for particular location"
          />
      )}
    </>
  );
};

export default LocationBlock;
