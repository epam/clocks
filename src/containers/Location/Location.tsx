import { useContext, useRef, useState, useEffect, FC } from 'react';
import { IconButton, Button } from '@material-ui/core';
import { EditOutlined, DeleteOutline, HomeOutlined } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';

import LocationContent from '../../components/LocationContent';
import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import { ModalContext } from '../../context/modal';
import { editorConfig } from '../../constants';
import { IAppLocation } from '../../types/location';

import css from './Location.module.scss';

const useStyles = makeStyles(theme => ({
  button: {
    background: theme.palette.background.default
  },
  grey: {
    color: theme.palette.grey[300]
  },
  mt20: {
    marginTop: '20px'
  }
}));

const Location: FC<IAppLocation> = ({
  offset,
  host,
  id,
  message,
  ...props
}) => {
  const classes = useStyles();
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
      return OpenSnackbar(
        'Comment message must not be longer than 100 characters'
      );
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
  const changeUserCurrentLocation = () =>
    ChangeUserCurrentLocation && ChangeUserCurrentLocation(id);

  return (
    <div className={css.card}>
      <div className={css['recycle-bin']}>
        {!host && (
          <IconButton
            data-testid="HomeIconButton"
            onClick={changeUserCurrentLocation}
            className={classes.button}
          >
            <HomeOutlined />
          </IconButton>
        )}
        <IconButton
          data-testid="DeleteButton"
          onClick={openDeleteModal}
          className={classes.button}
        >
          <DeleteOutline />
        </IconButton>
      </div>
      <div className={css.content}>
        <LocationContent
          hours={hours}
          minutes={minutes}
          host={host}
          {...props}
        />

        {messageVisibility ? (
          <div className={css.ckEditorContainer}>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={message}
              onBlur={onBlurHandler}
              ref={CKEditorRef}
            />
          </div>
        ) : message ? (
          <div className={`${css.message} ${classes.grey}`}>
            {ReactHtmlParser(message)}
            <IconButton
              data-testid="pencil-icon"
              onClick={() => setMessageVisibility(true)}
            >
              <EditOutlined className={classes.grey} />
            </IconButton>
          </div>
        ) : (
          <Button
            className={`${css['comment-icon']} ${classes.button} ${classes.grey} ${classes.mt20}`}
            data-testid="commentButton"
            onClick={() => setMessageVisibility(true)}
            variant="outlined"
          >
            Add comment
          </Button>
        )}
      </div>
    </div>
  );
};

export default Location;
