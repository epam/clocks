import React from 'react';
import { useSelector } from 'react-redux';

import { QueryBuilder } from '@mui/icons-material';

import useTheme from '../../hooks/useTheme';
import { IInitialState } from '../../redux/types';

import style from './Header.module.scss';
import DeleteMode from './components/DeleteMode/DeleteMode';
import PlanningMode from './components/PlanningMode/PlanningMode';
import SettingsModal from './components/SettingsModal/SettingsModal';
import ShareButton from './components/ShareButton/ShareButton';
import AddLocation from './components/AddLocation/AddLocation';
import DragDropMode from './components/DragDropMode/DragDropMode';
import { EPAM_LOGO } from './Header.constants';

const Header: React.FC = () => {
  const logoTheme = useTheme(style.lightLogo, style.darkLogo);
  const { autoSorting } = useSelector((state: IInitialState) => state.settings);

  return (
    <div className={style.body}>
      <div className={style.logoContainer}>
        <QueryBuilder fontSize="large" className={logoTheme} />
        <span className={logoTheme}>{EPAM_LOGO}</span>
      </div>
      <div className={style.controlsContainer}>
        {!autoSorting && <DragDropMode />}
        <PlanningMode />
        <DeleteMode />
        <SettingsModal />
        <ShareButton />
        <AddLocation />
      </div>
    </div>
  );
};

export default Header;
