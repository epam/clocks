import { useRef, useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Button } from '@material-ui/core';
import { EditOutlined, DeleteOutline, HomeOutlined } from '@mui/icons-material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';

import { editorConfig } from '../../lib/constants';
import { useUrl } from '../../hooks/useUrl';
import DeleteModal from '../DeleteModal';

import LocationContent from './components/LocationContent';
import styles from './Location.module.scss';
import { ILocationProps } from './Location.interface';

const Location: FC<ILocationProps> = ({
  offset,
  host,
  id,
  message,
  visibility,
  snackbar,
  type,
  changeUserCurrentLocation,
  ...props
}) => {
  const { t } = useTranslation();
  const { AddComment, DeleteLocation } = useUrl();
  const { hours, minutes } = offset;

  const CKEditorRef = useRef<any>(null);

  const [messageVisibility, setMessageVisibility] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (messageVisibility && CKEditorRef.current) {
      CKEditorRef.current.editor.editing.view.focus();
    }
  }, [messageVisibility]);

  const onBlurHandler = (event: any, editor: { getData: () => string }) => {
    const comment = editor.getData();
    if (comment.length > 100) {
      return snackbar({
        visibility: true,
        message: t('location.warning')
      });
    }
    if (visibility) {
      snackbar({ visibility: false });
    }
    if (AddComment) {
      AddComment(id, comment);
    }
    setMessageVisibility(false);
  };

  const DeleteModalHandler = () => {
    setIsDeleteModalOpen(prev => !prev);
  };

  const deleteLocation = () => DeleteLocation && DeleteLocation(id);

  const ChangeUserCurrentLocation = () => {
    changeUserCurrentLocation(id);
  };

  return (
    <div className={styles.card}>
      <DeleteModal
        type={type}
        isOpen={isDeleteModalOpen}
        modalHandler={DeleteModalHandler}
        deleteLocation={deleteLocation}
      />
      <div className={styles['recycle-bin']}>
        {!host && (
          <IconButton
            data-testid="HomeIconButton"
            onClick={ChangeUserCurrentLocation}
            className={styles.button}
          >
            <HomeOutlined />
          </IconButton>
        )}
        <IconButton
          data-testid="DeleteButton"
          onClick={DeleteModalHandler}
          className={styles.button}
        >
          <DeleteOutline />
        </IconButton>
      </div>
      <div className={styles.content}>
        <LocationContent
          type={type}
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
