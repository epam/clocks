import { useContext, useRef, useState, useEffect, FC, FocusEvent } from 'react';

import { IconButton, Typography } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import { ModalContext } from '../../context/modal';
import LocationContent from '../../components/LocationContent';
import css from './Location.module.scss';
import { Comment } from '../../assets/icons/icons';
import recycleBinIcon from '../../assets/icons/recycle-bin.svg';
import homeIcon from '../../assets/icons/home.svg';
import { IAppLocation } from '../../types/location';

const Location: FC<IAppLocation> = ({ timezone, city, country, offset, host, id, message }) => {
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [messageVisibility, setMessageVisibility] = useState<boolean>(false);

    useEffect(() => {
        if (messageVisibility && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [messageVisibility]);

    const onBlurHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
        const comment = event.target?.value;
        if (comment.length > 100 && OpenSnackbar) {
            return OpenSnackbar('Comment message must not be longer than 100 characters');
        }
        if (isSnackbarOpen && SnackbarHandler) {
            SnackbarHandler(false);
        }
        if (AddComment) {
            AddComment(id, event.target.value);
        }
        setMessageVisibility(false);
    };

    const openDeleteModal = () => {
        if (OpenDeleteModal) {
            OpenDeleteModal(id);
        }
    };

    const changeUserCurrentLocation = () => {
        if (ChangeUserCurrentLocation) {
            ChangeUserCurrentLocation(id);
        }
    };

    return (
        <div className={css.card}>
            <div className={css['recycle-bin']}>
                {!host && (
                    <IconButton onClick={changeUserCurrentLocation}>
                        <img src={homeIcon} alt="recycle-bin" className="icon" />
                    </IconButton>
                )}
                <IconButton onClick={openDeleteModal}>
                    <img src={recycleBinIcon} alt="recycle-bin" className="icon" />
                </IconButton>
            </div>
            <div className={css.content}>
                <LocationContent
                    hours={hours}
                    minutes={minutes}
                    host={host}
                    city={city}
                    country={country}
                    timezone={timezone}
                />

                {messageVisibility ? (
                    <textarea
                        ref={textAreaRef}
                        defaultValue={message}
                        maxLength={100}
                        onBlur={onBlurHandler}
                        className={css.textArea}
                        rows={3}
                    />
                ) : message ? (
                    <Typography onClick={() => setMessageVisibility(true)} className={css.message} variant="body1">
                        {message}
                    </Typography>
                ) : (
                    <IconButton className={css['comment-icon']} onClick={() => setMessageVisibility(true)}>
                        <Comment />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default Location;
