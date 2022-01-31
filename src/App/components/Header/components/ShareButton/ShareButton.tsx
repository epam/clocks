import React, {useMemo, useRef} from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import { ShareOutlined } from '@mui/icons-material';

import useSnackbar from '../../../../hooks/useSnackbar';
import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';

import style from './ShareButton.module.scss';
import Onboarding from "../../../Section/components/Onboarding/Onboarding";

const ShareButton: React.FC = () => {
  const anchorRef = useRef(null);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { snackbarInfo } = useSnackbar();

  const { t } = useTranslation();

  const { deleteMode, onboarding } = useSelector((state: IInitialState) => state);

  const handleCopy = () => {
    const url: string = window?.location?.href;

    navigator.clipboard.writeText(url);

    snackbarInfo(t('ShareButton.SnackbarMessage'));
  };

  const tooltipText = useMemo(() => t('ShareButton.ButtonTooltip'), [t]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton ref={anchorRef} onClick={handleCopy} disabled={deleteMode}>
          <ShareOutlined
            className={clsx({ [iconTheme]: true, [style.disabledIcon]: deleteMode })}
          />
        </IconButton>
      </Tooltip>
      {onboarding?.shareButton && anchorRef.current && (
          <Onboarding
              open={onboarding.shareButton}
              anchorElement={anchorRef.current}
              nextElement="deleteButton"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              title="Share url button"
              text="By clicking to this button you can copy your url to clipboard and send via any messenger"
          />
      )}
    </>
  );
};

export default ShareButton;
