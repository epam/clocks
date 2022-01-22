import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';

import style from './EmptyState.module.scss';

const EmptyState: React.FC = () => {
  const theme = useTheme(style.lightBody, style.darkBody);

  const { deleteMode } = useSelector((state: IInitialState) => state);

  const { t } = useTranslation();

  return (
    <div className={clsx({ [theme]: true, [style.deleteMode]: deleteMode })}>
      {t('EmptyState.Text')}
    </div>
  );
};

export default EmptyState;
