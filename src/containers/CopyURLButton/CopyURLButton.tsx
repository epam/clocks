import { FC, useState, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { SnackbarContext } from '../../context/snackbar';

const CopyURLButton: FC = () => {
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
            OpenSnackbar('Failed', 'danger');
          }
        });
    } else if (OpenSnackbar) {
      OpenSnackbar('Failed', 'danger');
    }
  };

  return (
    <IconButton
      aria-label="copy to clipboard button"
      disabled={isLoading}
      onClick={handleCopy}
      color="inherit"
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

export default CopyURLButton;
