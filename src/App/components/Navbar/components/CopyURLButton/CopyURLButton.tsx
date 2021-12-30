import { FC, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconButton } from '@material-ui/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { SnackbarContext } from '../../../../context/snackbar';

import styles from './CopyURLButton.module.scss';

const CopyURLButton: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { OpenSnackbar }
  } = useContext(SnackbarContext);

  const [isLoading, setLoading] = useState(false);

  const handleCopy = (): void => {
    const text = window?.location?.href;
    if ('clipboard' in navigator && text) {
      setLoading(true);

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setLoading(false);
          if (OpenSnackbar) {
            OpenSnackbar('Successfully copied to clipboard', 'success');
          }
        })
        .catch(() => {
          setLoading(false);
          if (OpenSnackbar) {
            OpenSnackbar('Failed', 'error');
          }
        });
    } else if (OpenSnackbar) {
      OpenSnackbar('Failed', 'error');
    }
  };

  return (
    <>
      <div className={styles['copy-icon-button']}>
        <IconButton
          aria-label="mobile copy to clipboard button"
          disabled={isLoading}
          onClick={handleCopy}
          color="inherit"
        >
          <ContentCopyIcon />
        </IconButton>
      </div>
      <div className={styles['copy-button']}>
        <Button
          aria-label="desktop copy to clipboard button"
          disabled={isLoading}
          variant="outlined"
          onClick={handleCopy}
          endIcon={<ContentCopyIcon />}
          color="inherit"
        >
          {t('navbar.copyURL')}
        </Button>
      </div>
    </>
  );
};

export default CopyURLButton;
