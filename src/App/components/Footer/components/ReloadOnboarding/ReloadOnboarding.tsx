import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Button, Dialog, IconButton, Tooltip } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import useTheme from '../../../../hooks/useTheme';

import style from './ReloadOnboarding.module.scss';
import useOnboarding from '../../../../hooks/useOnboarding';

const ReloadOnboarding: React.FC = () => {
  const { initialize } = useOnboarding();
  const { t } = useTranslation();
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const buttonTheme = useTheme(style.lightIcon, style.darkIcon);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReload = () => {
    handleClose();
    localStorage.removeItem('onboarding');
    initialize();
  };

  const tooltipText = useMemo((): string => t('ReloadOnboarding.ButtonTooltip'), [t]);
  return (
    <>
      <Tooltip placement="top" title={tooltipText} arrow>
        <IconButton onClick={handleOpen} disabled={false}>
          <SettingsBackupRestoreIcon className={clsx({ [buttonTheme]: true })}>
            Open Modal
          </SettingsBackupRestoreIcon>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <div className={bodyTheme}>
          <div className={style.modalTitle}>{t('ReloadOnboarding.HeaderText')}</div>
          <div className={style.buttonContainer}>
            <Button className={style.button} onClick={handleClose}>
              {t('Settings.CancelButton')}
            </Button>
            <Button className={style.button} onClick={handleReload}>
              {t('ReloadOnboarding.ReloadButton')}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ReloadOnboarding;
