import { useContext, useRef, useState, useEffect, FC } from 'react';

import { IconButton, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import { ModalContext } from '../../context/modal';
import LocationContent from '../../components/LocationContent';
import css from './Location.module.scss';
import { HomeIcon, DeleteIcon, Pencil } from '../../assets/icons/icons';
import { IAppLocation } from '../../types/location';
import { ThemeContext } from '../../context/theme';
import { editorConfig } from '../../constants';

const useStyles = makeStyles(theme => ({
    button: {
        background: theme.palette.background.default
    },
    comment: {
        color: theme.palette.text.primary
    },
    grey: {
        color: theme.palette.grey[300]
    }
}));

const Location: FC<IAppLocation> = ({ offset, host, id, message, ...props }) => {
    const classes = useStyles();
    const {
        state: { type }
    } = useContext(ThemeContext);
    const { hours, minutes } = offset;
    const {
        actions: { AddComment, ChangeUserCurrentLocation }
    } = useContext(LocationsContext);
    const {
        actions: { OpenDeleteModal }
    } = useContext(ModalContext);
    const {
        actions: { OpenSnackbar, SnackbarHandler },
        state: { isSnackbarOpen }
    } = useContext(SnackbarContext);
    const CKEditorRef = useRef<any>(null);

    const [messageVisibility, setMessageVisibility] = useState<boolean>(false);

    useEffect(() => {
        if (messageVisibility && CKEditorRef.current) {
            CKEditorRef.current.editor.editing.view.focus();
        }
    }, [messageVisibility]);

    const onBlurHandler = (event: any, editor: { getData: () => string }) => {
        const comment = editor.getData();
        if (comment.length > 100 && OpenSnackbar) {
            return OpenSnackbar('Comment message must not be longer than 100 characters');
        }
        if (isSnackbarOpen && SnackbarHandler) {
            SnackbarHandler(false);
        }
        if (AddComment) {
            AddComment(id, comment);
        }
        setMessageVisibility(false);
    };

    const openDeleteModal = () => OpenDeleteModal && OpenDeleteModal(id);
    const changeUserCurrentLocation = () => ChangeUserCurrentLocation && ChangeUserCurrentLocation(id);

    return (
        <div className={css.card}>
            <div className={css['recycle-bin']}>
                {!host && (
                    <IconButton
                        data-testid="HomeIconButton"
                        onClick={changeUserCurrentLocation}
                        className={classes.button}
                    >
                        <HomeIcon color={type === 'light' ? '#000' : '#FFF'} />
                    </IconButton>
                )}
                <IconButton data-testid="DeleteButton" onClick={openDeleteModal} className={classes.button}>
                    <DeleteIcon color={type === 'light' ? '#000' : '#FFF'} />
                </IconButton>
            </div>
            <div className={css.content}>
                <LocationContent hours={hours} minutes={minutes} host={host} {...props} />

                {messageVisibility ? (
                    <CKEditor
                        editor={ClassicEditor}
                        config={editorConfig}
                        data={message}
                        onBlur={onBlurHandler}
                        className={css.textArea}
                        ref={CKEditorRef}
                    />
                ) : message ? (
                    <Typography className={`${css.message} ${classes.comment}`}>
                        {ReactHtmlParser(message)}
                        <IconButton className={css['pencil-icon']} onClick={() => setMessageVisibility(true)}>
                            <Pencil color={type === 'light' ? '#000' : '#FFF'} />
                        </IconButton>
                    </Typography>
                ) : (
                    <Button
                        className={`${css['comment-icon']} ${classes.button} ${classes.grey}`}
                        data-testid="commentButton"
                        onClick={() => setMessageVisibility(true)}
                    >
                        Add comment
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Location;
