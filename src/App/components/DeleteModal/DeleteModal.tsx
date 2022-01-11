import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography, Modal, Backdrop, Fade } from '@material-ui/core';
import clsx from 'clsx';
import styles from './DeleteModal.module.scss';
import { IDeleteModalProps } from './DeleteModal.interface';
import { THEMES } from '../../redux/themeRedux/theme.constants';

const DeleteModal: FC<IDeleteModalProps> = ({
  isOpen = false,
  modalHandler,
  deleteLocation,
  type
}) => {
  const { t } = useTranslation();

  const deleteHandler = () => {
    deleteLocation();
    modalHandler();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.modal}
      open={isOpen}
      onClose={modalHandler}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isOpen}>
        <div
          className={`${styles.paper} ${clsx({
            [styles['paper-light']]: type === THEMES.light,
            [styles['paper-dark']]: type === THEMES.dark
          })}`}
        >
          <div className={styles['text-block']}>
            <Typography
              paragraph
              variant="subtitle2"
              className={`${styles.text} ${clsx({
                [styles['text-dark']]: type === THEMES.light,
                [styles['text-light']]: type === THEMES.dark
              })}`}
            >
              {t('deleteModal.confirm')}
            </Typography>
          </div>
          <div className={styles['buttons-container']}>
            <Button
              variant="outlined"
              className={`${styles.button} ${styles['cancel-button']}`}
              onClick={modalHandler}
            >
              {t('cancel', { ns: 'common' })}
            </Button>
            <Button
              variant="outlined"
              className={`${styles.button} ${styles['delete-button']}`}
              onClick={deleteHandler}
            >
              {t('deleteModal.delete')}
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
