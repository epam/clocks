import React, { useMemo, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { Button, Dialog, IconButton, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

import useTheme from '../../../../hooks/useTheme';
import Onboarding from '../../../Section/components/Onboarding/Onboarding';
import { IInitialState } from '../../../../redux/types';

import style from './HelpModule.module.scss';

const HelpModule = () => {
  const anchorHelpModule = useRef(null);
  const { t } = useTranslation();
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const buttonTheme = useTheme(style.lightIcon, style.darkIcon);
  const [open, setOpen] = useState(false);

  const { onboarding } = useSelector((state: IInitialState) => state);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tooltipText = useMemo((): string => t('HelpModule.buttonTooltip'), [t]);
  return (
    <>
      <Tooltip placement="top" title={tooltipText} arrow>
        <IconButton ref={anchorHelpModule} onClick={handleOpen} disabled={false}>
          <HelpIcon className={clsx({ [buttonTheme]: true })}>Open Module</HelpIcon>
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <div className={bodyTheme}>
          <div className={style.modalTitle}>{t('HelpModule.headerText')}</div>

          <p>{t('HelpModule.headerInfo')}</p>

          <Trans
            t={t}
            i18nKey="HelpModule.info"
            components={{ li: <li />, ul: <ul />, p: <p /> }}
          />

          <div className={style.buttonContainer}>
            <Button className={style.button} onClick={handleClose}>
              {t('Settings.CancelButton')}
            </Button>
          </div>
        </div>
      </Dialog>
      {onboarding?.helpModule && anchorHelpModule.current && (
        <Onboarding
          open={onboarding.helpModule}
          anchorElement={anchorHelpModule.current}
          nextElement="reloadOnboarding"
          anchorOrigin={{ vertical: -25, horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          title={t('Onboarding.HelpModuleTitle')}
          text={t('Onboarding.HelpModuleContent')}
        />
      )}
    </>
  );
};

export default HelpModule;
