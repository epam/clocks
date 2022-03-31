import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import { SwipeOutlined } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme/useTheme';
import { IInitialState } from '../../../../redux/types';
import { setDragDropMode } from '../../../../redux/actions';

import style from './DragDropMode.module.scss';

const DragDropMode: React.FC = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const { deleteMode, dragDropMode } = useSelector((state: IInitialState) => state);

  const dispatch = useDispatch();

  const handleSetDragDropMode = () => {
    dispatch(setDragDropMode(!dragDropMode.isOn));
  };

  const tooltipText = useMemo((): string => t('DragDropMode.ButtonTooltip'), [t]);

  return (
    <div className={style.body}>
      <Tooltip title={tooltipText} arrow>
        <IconButton onClick={handleSetDragDropMode}>
          <SwipeOutlined
            className={clsx({
              [iconTheme]: true,
              [style.blueIcon]: dragDropMode.isOn,
              [style.disabledIcon]: deleteMode.isOn
            })}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DragDropMode;
