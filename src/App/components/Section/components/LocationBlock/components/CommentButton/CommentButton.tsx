import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { t } from 'i18next';

import { CommentOutlined } from '@mui/icons-material';
import { Button, Dialog, IconButton, Tooltip } from '@mui/material';

import { useSelector } from 'react-redux';
import useTheme from '../../../../../../hooks/useTheme';
import { IInitialState } from '../../../../../../redux/types';
import Onboarding from '../../../Onboarding/Onboarding';
import useLocations from '../../../../../../hooks/useLocations';

import style from '../DragDropContainer/DragDropContainer.module.scss';
import modalStyle from './CommentButton.module.scss';
import { ICommentButtonProps } from './CommentButton.types';

const CommentButton: React.FC<ICommentButtonProps> = ({ location, index }) => {
  const [inputText, setInputText] = useState<string>('');

  const commentModalTheme = useTheme(modalStyle.lightCommentModal, modalStyle.darkCommentModal);
  const [commentModal, setCommentModal] = useState(false);
  const { locations, setLocations } = useLocations();

  const anchorComment = useRef(null);

  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { deleteMode, dragDropMode, planningMode, onboarding } = useSelector(
    (state: IInitialState) => state
  );
  const disabled = useMemo(
    () => deleteMode.isOn || dragDropMode.isOn || planningMode.isOn,
    [planningMode, deleteMode, dragDropMode]
  );

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
    // use it only when component mount
    // eslint-disable-next-line
  }, [location]);

  const commentTooltipText = useMemo((): string => t('LocationBlock.TooltipComment'), []);
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

      <Dialog open={commentModal} onClose={handleCloseCommentModal}>
        <form className={commentModalTheme} onSubmit={handleSaveComment}>
          <div className={modalStyle.modalTitle}>{t('LocationBlock.CommentModalTitle')}</div>
          <div>
            <input
              className={modalStyle.input}
              maxLength={50}
              placeholder={t('LocationBlock.CommentModalInputPlaceholder')}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              autoFocus={true}
            />
          </div>
          <div className={modalStyle.buttonContainer}>
            <Button className={modalStyle.button} onClick={handleCloseCommentModal}>
              {t('Settings.CancelButton')}
            </Button>
            <Button className={modalStyle.button} type="submit">
              {t('Settings.SaveButton')}
            </Button>
          </div>
        </form>
      </Dialog>

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
    </>
  );
};

export default CommentButton;
