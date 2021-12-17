import { FC, useState, useContext } from 'react';
import { Button, IconButton } from '@material-ui/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { SnackbarContext } from '../../context/snackbar';
import { ScreenSizesContext } from '../../context/screenSizes';

const CopyURLButton: FC = () => {
  const {
    actions: { OpenSnackbar }
  } = useContext(SnackbarContext);
  const {
    state: { width }
  } = useContext(ScreenSizesContext);

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

  if (width && width <= 700) {
    return (
      <IconButton
        aria-label="mobile copy to clipboard button"
        disabled={isLoading}
        onClick={handleCopy}
        color="inherit"
      >
        <ContentCopyIcon />
      </IconButton>
    );
  }

  return (
    <Button
      aria-label="desktop copy to clipboard button"
      disabled={isLoading}
      variant="outlined"
      onClick={handleCopy}
      endIcon={<ContentCopyIcon />}
      color="inherit"
    >
      COPY URL
    </Button>
  );
};

export default CopyURLButton;
