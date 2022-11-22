import style from './CookiePolicy.module.scss';
import useTheme from '../../../../hooks/useTheme';
import { Button, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CookiePolicy = () => {
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const [isModalOpen, setOpen] = useState(true);
  const { t } = useTranslation();

  const handleClick = () => {
    localStorage.setItem('cookies', String(true));
    setOpen(false);
  };

  useEffect(() => {
    const cookies = localStorage.getItem('cookies');

    if (!cookies) {
      localStorage.setItem('cookies', String(false));
    } else {
      setOpen(!JSON.parse(cookies));
    }
  }, []);

  return (
    <Modal open={isModalOpen} sx={{ zIndex: 1400 }}>
      <div className={bodyTheme}>
        <div>
          {t('CookiePolicy.Info')}
          <a
            className={style.link}
            href="https://www.epam.com/cookie-policy"
            target="_blank"
            rel="noreferrer"
          >
            {t('CookiePolicy.Link')}
          </a>
        </div>
        <Button className={style.button} onClick={handleClick}>
          {t('CookiePolicy.Button')}
        </Button>
      </div>
    </Modal>
  );
};

export default CookiePolicy;
