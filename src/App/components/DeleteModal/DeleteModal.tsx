import { FC, useContext } from 'react';
import { Button, Typography, Modal, Backdrop, Fade } from '@material-ui/core';
import clsx from 'clsx';

import { ThemeContext } from '../../context/theme';
import { THEMES } from '../../lib/constants';

import styles from './DeleteModal.module.scss';
import { IDeleteModalProps } from './DeleteModal.interface';

const DeleteModal: FC<IDeleteModalProps> = ({
  isOpen = false,
  modalHandler,
  deleteLocation
}) => {
  const {
    state: { type }
  } = useContext(ThemeContext);

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
              Are you sure you want to delete?
            </Typography>
          </div>
          <div className={styles['buttons-container']}>
            <Button
              variant="outlined"
              className={`${styles.button} ${styles['cancel-button']}`}
              onClick={modalHandler}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              className={`${styles.button} ${styles['delete-button']}`}
              onClick={deleteHandler}
            >
              Delete
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
