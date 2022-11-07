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
    localStorage.setItem('cookies', 'true');
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem('cookies') === null) {
      localStorage.setItem('cookies', 'false');
    }
    if (localStorage.getItem('cookies') === 'false') {
      setOpen(true);
    }
    if (localStorage.getItem('cookies') === 'true') {
      setOpen(false);
    }
  }, []);

  return (
    <Modal open={isModalOpen}>
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
