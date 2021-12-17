import { FC, useContext } from 'react';
import { Button, Typography, Modal, Backdrop, Fade } from '@material-ui/core';
import clsx from 'clsx';

import { ModalContext } from '../../context/modal';
import { LocationsContext } from '../../context/locations';
import { ThemeContext } from '../../context/theme';
import { THEMES } from '../../lib/constants';

import styles from './DeleteModal.module.scss';

const DeleteModal: FC = () => {
  const {
    state: { isModalOpen, locationId },
    actions: { ModalHandler }
  } = useContext(ModalContext);
  const {
    actions: { DeleteLocation }
  } = useContext(LocationsContext);
  const {
    state: { type }
  } = useContext(ThemeContext);

  const handleClose = () => {
    if (ModalHandler) {
      ModalHandler(false);
    }
  };

  const deleteLocation = () => {
    if (DeleteLocation && ModalHandler && locationId) {
      DeleteLocation(locationId);
      ModalHandler(false);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={styles.modal}
      open={isModalOpen || false}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isModalOpen}>
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
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              className={`${styles.button} ${styles['delete-button']}`}
              onClick={deleteLocation}
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
