import { useContext, useRef, useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Button } from '@material-ui/core';
import { EditOutlined, DeleteOutline, HomeOutlined } from '@mui/icons-material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';

import LocationContent from './components/LocationContent';
import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import { ModalContext } from '../../context/modal';
import { editorConfig } from '../../lib/constants';
import { IAppLocation } from '../../lib/interfaces';

import styles from './Location.module.scss';

const Location: FC<IAppLocation> = ({
  offset,
  host,
  id,
  message,
  ...props
}) => {
  const { t } = useTranslation();
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
      return OpenSnackbar(t('location.warning'));
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
    <div className={styles.card}>
      <div className={styles['recycle-bin']}>
        {!host && (
          <IconButton
            data-testid="HomeIconButton"
            onClick={changeUserCurrentLocation}
            className={styles.button}
          >
            <HomeOutlined />
          </IconButton>
        )}
        <IconButton
          data-testid="DeleteButton"
          onClick={openDeleteModal}
          className={styles.button}
        >
          <DeleteOutline />
        </IconButton>
      </div>
      <div className={styles.content}>
        <LocationContent
          hours={hours}
          minutes={minutes}
          host={host}
          {...props}
        />

        {messageVisibility ? (
          <div className={styles.ckEditorContainer}>
            <CKEditor
              editor={ClassicEditor}
              config={editorConfig}
              data={message}
              onBlur={onBlurHandler}
              ref={CKEditorRef}
            />
          </div>
        ) : message ? (
          <div className={`${styles.message} ${styles.grey}`}>
            {ReactHtmlParser(message)}
            <IconButton
              data-testid="pencil-icon"
              onClick={() => setMessageVisibility(true)}
            >
              <EditOutlined className={styles.grey} />
            </IconButton>
          </div>
        ) : (
          <Button
            className={`${styles['comment-icon']} ${styles.button} ${styles.grey} ${styles.mt20}`}
            data-testid="commentButton"
            onClick={() => setMessageVisibility(true)}
            variant="outlined"
          >
            {t('location.addComment')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Location;
