import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

import { Close, CommentOutlined } from '@mui/icons-material';
import { Button, Dialog, IconButton, Tooltip } from '@mui/material';

import useLocations from '../../../../../../hooks/useLocations';
import useTheme from '../../../../../../hooks/useTheme';
import { IInitialState } from '../../../../../../redux/types';
import Onboarding from '../../../Onboarding/Onboarding';

import style from './CommentButton.module.scss';
import { ICommentButtonProps } from './CommentButton.types';

const CommentButton: React.FC<ICommentButtonProps> = ({ location, index }) => {
  const [commentModal, setCommentModal] = useState(false);
  const [inputText, setInputText] = useState<string>('');

  const { deleteMode, onboarding } = useSelector((state: IInitialState) => state);

  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const commentModalTheme = useTheme(style.lightCommentModal, style.darkCommentModal);
  const { locations, setLocations } = useLocations();

  const anchorComment = useRef(null);
  const disabled = useMemo(() => deleteMode.isOn, [deleteMode]);

  const commentTooltipText = useMemo((): string => t('LocationBlock.TooltipComment'), []);

  const handleOpenCommentModal = () => {
    setCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModal(false);
  };

  const handleSaveComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Object.values(locations).forEach((urlLocation: any) => {
      if (urlLocation.city === location?.city && urlLocation.lat === location?.lat) {
        urlLocation.comment = inputText;
      }
    });
    setLocations(locations);
    handleCloseCommentModal();
  };

  useEffect(() => {
    if (location && locations[location.city + location.lat].comment) {
      setInputText(locations[location.city + location.lat].comment || '');
    }
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
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

      {commentModal && (
        <Dialog open={commentModal} onClose={handleCloseCommentModal}>
          <form className={commentModalTheme} onSubmit={handleSaveComment}>
            <div className={style.header}>
              <div className={style.modalTitle}>{t('LocationBlock.CommentModalTitle')}</div>
              <IconButton onClick={handleCloseCommentModal}>
                <Close className={iconTheme} />
              </IconButton>
            </div>
            <div>
              <input
                className={style.input}
                placeholder={t('LocationBlock.CommentModalInputPlaceholder')}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                autoFocus={true}
              />
            </div>
            <div className={style.buttonContainer}>
              <Button className={style.button} type="submit">
                {t('Settings.SaveButton')}
              </Button>
            </div>
          </form>
        </Dialog>
      )}

      {!index && onboarding?.comment && anchorComment.current && (
        <Onboarding
          open={onboarding.comment}
          anchorElement={anchorComment.current}
          nextElement="helpModule"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          title={t('Onboarding.AddCommentTitle')}
          text={t('Onboarding.AddCommentContent')}
        />
      )}
    </>
  );
};

export default CommentButton;
