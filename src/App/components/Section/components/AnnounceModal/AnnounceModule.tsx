import { Button, Dialog, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../../hooks/useTheme';
import style from './AnnounceModule.module.scss';
import pckg from '../../../../../../package.json';
import { RELEASE_VERSIONS } from '../../../../utils/constants';
import clsx from 'clsx';

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

  const releases = Object.values(RELEASE_VERSIONS);

  return (
    <div>
      {
        <Dialog open={openAnnounceModal} onClose={handleClose}>
          <div className={bodyTheme}>
            <div className={style.modalTitle}>{t('AnnounceModule.announceTitle')}</div>
            <Divider />
            {releases.map((release, idx) => (
              <div key={idx} className={clsx({ [style.dimmed]: idx > 0 })}>
                <h1 className={style.release}>Release {release.version}</h1>
                <ul>
                  {release.changes.map((item, idx) => (
                    <li key={item + idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
