import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalContext } from '../../context/modal';
import { LocationsContext } from '../../context/locations';
import { EpamColors } from '../../constants';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: 0,
        boxShadow: theme.shadows[5],
        minWidth: '400px',
        minHeight: '150px',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    textBlock: {
        flex: '1 1 50px',
        fontSize: '1.3rem',
        letterSpacing: '.02em'
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    button: {
        width: '50%',
        borderRadius: 0
    },
    deleteButton: {
        backgroundColor: EpamColors.red,
        opacity: 0.95,
        color: 'white',
        '&:hover': {
            backgroundColor: EpamColors.red,
            opacity: 1
        }
    }
}));

function AppModal() {
    const classes = useStyles();
    const {
        state: { isModalOpen, locationId },
        actions: { ModalHandler }
    } = useContext(ModalContext);
    const {
        actions: { DeleteLocation }
    } = useContext(LocationsContext);

    const handleClose = () => {
        ModalHandler(false);
    };

    const deleteLocation = () => {
        DeleteLocation(locationId);
        ModalHandler(false);
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={isModalOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500
            }}
        >
            <Fade in={isModalOpen}>
                <div className={classes.paper}>
                    <div className={`content-center ${classes.textBlock}`}>
                        <p id="transition-modal-title">Do you want to delete this location</p>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button variant="contained" className={classes.button} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
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

export default AppModal;
