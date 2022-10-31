import { Link } from 'react-router-dom';
import { QueryBuilder } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import useTheme from '../../../hooks/useTheme';
import { EPAM_LOGO } from '../../Header/Header.constants';
import { THEME } from '../../../redux/constants';
import { IInitialState } from '../../../redux/types';

import style from './NotFound.module.scss';

const NotFound = () => {
  const logoTheme = useTheme(style.lightLogo, style.darkLogo);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const cardTheme = useTheme(style.lightCard, style.darkCard);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const { theme } = useSelector((state: IInitialState) => state.settings);

  const { t } = useTranslation();

  return (
    <div className={bodyTheme}>
      <div className={style.container}>
        <div className={style.logoContainer}>
          <QueryBuilder fontSize="large" className={logoTheme} />
          <span className={logoTheme}>{EPAM_LOGO}</span>
        </div>
        <div>
          <div className={style.infoContainer}>
            <div>
              <div className={cardTheme}>
                <div className={style.leftSide}>404</div>
                <Divider
                  orientation="vertical"
                  className={clsx({
                    [style.divider]: true,
                    [style.darkDivider]: theme === THEME.dark
                  })}
                />
                <div className={style.rightSide}>
                  <div className={style.info}>
                    <span>{t('NotFound.Paragraph1')}</span>
                  </div>
                  <br />
                  <div className={style.info}>{t('NotFound.Paragraph2')}</div>
                  <br />
                  <div className={style.info}>{t('NotFound.Paragraph3')}</div>
                  <br />
                  <Link to={'/'}>
                    <HomeOutlinedIcon className={iconTheme} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
