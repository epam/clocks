import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';
import { setPlanningMode } from '../../../../redux/actions';

import style from './PlanningMode.module.scss';

const DeleteMode: React.FC = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { planningMode, deleteMode, additionalHours } = useSelector(
    (state: IInitialState) => state
  );

  const handleSetPlanningMode = () => {
    dispatch(
      setPlanningMode({
        status: !planningMode,
        additionalHours: planningMode ? additionalHours : 0
      })
    );
  };

  const tooltipText = useMemo((): string => t('Planning mode'), [t]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton onClick={handleSetPlanningMode} disabled={deleteMode}>
          <HistoryIcon
            className={clsx({
              [iconTheme]: true,
              [style.disabledIcon]: deleteMode,
              [style.blueIcon]: planningMode
            })}
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeleteMode;
