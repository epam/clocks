import React, { useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Button, Dialog, IconButton, Tooltip } from '@mui/material';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';

import Onboarding from '../../../Section/components/Onboarding/Onboarding';
import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';
import useOnboarding from '../../../../hooks/useOnboarding';

import style from './ReloadOnboarding.module.scss';

const ReloadOnboarding: React.FC = () => {
  const reloadOnboardingRef = useRef(null);
  const { initialize } = useOnboarding();
  const { t } = useTranslation();
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const buttonTheme = useTheme(style.lightIcon, style.darkIcon);
  const [open, setOpen] = useState(false);
  const { onboarding } = useSelector((state: IInitialState) => state);
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
        <IconButton ref={reloadOnboardingRef} onClick={handleOpen} disabled={false}>
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
      {onboarding?.reloadOnboarding && reloadOnboardingRef.current && (
        <Onboarding
          open={onboarding.reloadOnboarding}
          anchorElement={reloadOnboardingRef.current}
          anchorOrigin={{ vertical: -25, horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          title={t('Onboarding.ReloadOnboardingTitle')}
          text={t('Onboarding.ReloadOnboardingContent')}
        />
      )}
    </>
  );
};

export default ReloadOnboarding;
