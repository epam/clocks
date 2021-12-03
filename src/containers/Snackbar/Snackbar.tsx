import { FC, useContext, SyntheticEvent } from 'react';
import { IconButton, Snackbar as MuiSnackbar } from '@material-ui/core';
import { SnackbarContext } from '../../context/snackbar';
import css from './Snackbar.module.scss';
import { CrossIcon } from '../../assets/icons/icons';

const Snackbar: FC = () => {
    const {
        state: { isSnackbarOpen, message, position, status },
        actions: { SnackbarHandler }
    } = useContext(SnackbarContext);

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        if (SnackbarHandler) {
            SnackbarHandler(false);
        }
    };
    const SnackbarStatus = status || 'success';

    return (
        <MuiSnackbar anchorOrigin={position} open={isSnackbarOpen} autoHideDuration={5000} onClose={handleClose}>
            <div className={`${css.container} ${css[SnackbarStatus]}`}>
                <span className={css.message}>{message || ''}</span>
                <IconButton
                    className={css.closeButton}
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                >
                    <CrossIcon />
                </IconButton>
            </div>
        </MuiSnackbar>
    );
};

export default Snackbar;
