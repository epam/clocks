import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import { ShareOutlined } from '@mui/icons-material';

import useSnackbar from '../../../../hooks/useSnackbar';
import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';

import style from './ShareButton.module.scss';

const ShareButton: React.FC = () => {
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
        <IconButton onClick={handleCopy} disabled={deleteMode}>
          <ShareOutlined
            className={clsx({ [iconTheme]: true, [style.disabledIcon]: deleteMode })}
          />
        </IconButton>
      </Tooltip>

    </>
  );
};

export default ShareButton;
