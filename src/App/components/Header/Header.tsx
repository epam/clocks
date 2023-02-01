import React from 'react';

import { QueryBuilder } from '@mui/icons-material';

import useTheme from '../../hooks/useTheme';

import style from './Header.module.scss';
import { AddTitle } from './components/AddTitle/AddTitle';
import DeleteMode from './components/DeleteMode/DeleteMode';
import SettingsModal from './components/SettingsModal/SettingsModal';
import ShareButton from './components/ShareButton/ShareButton';
import AddLocation from './components/AddLocation/AddLocation';
import { EPAM_LOGO } from './Header.constants';
import LaneMode from './components/LaneMode/LaneMode';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Header: React.FC = () => {
  const logoTheme = useTheme(style.lightLogo, style.darkLogo);
  const { width } = useWindowDimensions();
  const isMobileView = width <= 600;

  return (
    <div className={style.body}>
      <div className={style.logoContainer}>
        <QueryBuilder fontSize="large" className={logoTheme} />
        <span className={logoTheme}>{EPAM_LOGO}</span>
      </div>
      <div className={style.controlsContainer}>
        <AddTitle />
        {!isMobileView && <LaneMode />}
        <DeleteMode />
        <SettingsModal />
        <ShareButton />
        <AddLocation />
      </div>
    </div>
  );
};

export default Header;
