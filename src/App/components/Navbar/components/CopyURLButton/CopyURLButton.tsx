import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconButton } from '@material-ui/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import styles from './CopyURLButton.module.scss';
import { IProps } from './CopyURLButton.interface';

const CopyURLButton: FC<IProps> = ({ snackbar }) => {
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(false);

  const successful = (message: string) =>
    ({
      visibility: true,
      message,
      type: 'success'
    } as const);

  const fail = (message: string) =>
    ({
      visibility: true,
      message,
      type: 'error'
    } as const);

  const handleCopy = (): void => {
    const text = window?.location?.href;
    if ('clipboard' in navigator && text) {
      setLoading(true);

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setLoading(false);
          snackbar(successful('Successfully copied to clipboard'));
        })
        .catch(() => {
          setLoading(false);
          snackbar(fail('Failed'));
        });
    } else {
      snackbar(fail('Failed'));
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
