import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ModalContext } from '../../context/modal';
import { LocationsContext } from '../../context/locations';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '1em',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 'none'
    },
    buttonsContainer: {
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-around'
    }
}));

export default function AppModal() {
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
                    <h2 id="transition-modal-title">Do you want to delete this location</h2>
                    <div className={classes.buttonsContainer}>
                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" onClick={deleteLocation}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Fade>
        </Modal>
    );
}
