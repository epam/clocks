import React from 'react';
import { Modal, Backdrop, Fade, IconButton } from '@material-ui/core';
import css from './InputModal.module.scss';
import { CrossIcon } from '../../assets/icons/icons';

const InputModal = ({ visibility, onClose }) => {
    return (
        <Modal
            className={css.modal}
            open={visibility}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                classes: {
                    root: css.backdropColor
                }
            }}
        >
            <Fade in={visibility}>
                <div className={css.wrapper}>
                    <h1> hello world </h1>

                    <IconButton aria-label="close-button" id={css.exit} onClick={onClose}>
                        <CrossIcon />
                    </IconButton>
                </div>
            </Fade>
        </Modal>
    );
};
export default InputModal;
