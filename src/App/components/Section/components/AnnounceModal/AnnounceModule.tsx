import { Button, Dialog, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import useTheme from '../../../../hooks/useTheme';
import style from './AnnounceModule.module.scss';
import pckg from '../../../../../../package.json';

const AnnounceModule = () => {
  const { t } = useTranslation();

  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const [openAnnounceModal, setOpenAnnounceModal] = useState(false);

  const handleClose = () => setOpenAnnounceModal(false);
  const handleOpen = () => setOpenAnnounceModal(true);

  useEffect(() => {
    if (pckg.version !== localStorage.getItem('version')) {
      handleOpen();
      // dispatch(setVersion(pckg.version));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {
        <Dialog open={openAnnounceModal} onClose={handleClose}>
          <div className={bodyTheme}>
            <div className={style.modalTitle}>{t('AnnounceModule.announceTitle')}</div>
            <Divider />

            <h1 className={style.release}>
              <Trans t={t} i18nKey="AnnounceModule.release" values={{ version: pckg.version }} />
            </h1>
            <Trans t={t} i18nKey="AnnounceModule.info" components={{ li: <li />, ul: <ul /> }} />

            <div className={style.buttonContainer}>
              <Button className={style.button} onClick={handleClose}>
                {t('AnnounceModule.close')}
              </Button>
            </div>
          </div>
        </Dialog>
      }
    </div>
  );
};

export default AnnounceModule;
