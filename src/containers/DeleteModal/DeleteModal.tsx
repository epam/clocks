import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { ModalContext } from '../../context/modal';
import { LocationsContext } from '../../context/locations';
import { EpamColors } from '../../constants';

import styles from './DeleteModal.module.scss';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textBlock: {
    flex: '1 1 50px'
  },
  text: {
    fontSize: '1.3rem',
    color: theme.palette.text.primary,
    margin: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px'
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  button: {
    width: '50%'
  },
  cancelButton: {
    margin: '0 5px 10px 10px'
  },
  deleteButton: {
    backgroundColor: EpamColors.red,
    borderColor: EpamColors.red,
    opacity: 0.95,
    margin: '0 10px 10px 5px',
    color: 'white',
    '&:hover': {
      backgroundColor: EpamColors.red,
      opacity: 1
    }
  }
}));

function DeleteModal() {
  const classes = useStyles();
  const {
    state: { isModalOpen, locationId },
    actions: { ModalHandler }
  } = useContext(ModalContext);
  const {
    actions: { DeleteLocation }
  } = useContext(LocationsContext);

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
      className={classes.modal}
      open={isModalOpen || false}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={isModalOpen}>
        <div className={`${classes.paper} ${styles.paper}`}>
          <div className={classes.textBlock}>
            <Typography paragraph variant="subtitle2" className={classes.text}>
              Are you sure you want to delete?
            </Typography>
          </div>
          <div className={classes.buttonsContainer}>
            <Button
              variant="outlined"
              className={`${classes.button} ${classes.cancelButton}`}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              className={`${classes.button} ${classes.deleteButton}`}
              onClick={deleteLocation}
            >
              Delete
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}

export default DeleteModal;
