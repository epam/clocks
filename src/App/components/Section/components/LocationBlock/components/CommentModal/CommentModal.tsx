import React, { useState } from 'react';

import { Button, Dialog } from '@mui/material';

import { t } from 'i18next';
import useTheme from '../../../../../../hooks/useTheme';
import useLocations from '../../../../../../hooks/useLocations';

import style from './CommentModal.module.scss';
import { ICommentModuleProps } from './commentModal.types';

const CommentModal: React.FC<ICommentModuleProps> = ({ location, commentModal, handleClose }) => {
  const [inputText, setInputText] = useState<string>('');

  const commentModalTheme = useTheme(style.lightCommentModal, style.darkCommentModal);
  const { locations, setLocations } = useLocations();

  const handleSaveComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    Object.values(locations).forEach((urlLocation: any) => {
      if (urlLocation.city === location?.city && urlLocation.lat === location?.lat) {
        urlLocation.comment = inputText;
      }
    });
    setLocations(locations);
    handleClose();
  };
  return (
    <Dialog open={commentModal} onClose={handleClose}>
      <form className={commentModalTheme} onSubmit={handleSaveComment}>
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
          <Button className={style.button} onClick={handleClose}>
            {t('Settings.CancelButton')}
          </Button>
          <Button className={style.button} type="submit">
            {t('Settings.SaveButton')}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default CommentModal;
