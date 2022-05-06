import React, { useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import { SwipeOutlined } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';
import { setDragDropMode } from '../../../../redux/actions';
import Onboarding from '../../../Section/components/Onboarding/Onboarding';

import style from './DragDropMode.module.scss';

const DragDropMode: React.FC = () => {
  const anchorRef = useRef(null);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const { deleteMode, dragDropMode, onboarding } = useSelector((state: IInitialState) => state);

  const dispatch = useDispatch();

  const handleSetDragDropMode = () => {
    dispatch(setDragDropMode(!dragDropMode.isOn));
  };

  const tooltipText = useMemo((): string => t('DragDropMode.ButtonTooltip'), [t]);

  return (
    <div className={style.body}>
      <Tooltip title={tooltipText} arrow>
        <IconButton ref={anchorRef} onClick={handleSetDragDropMode}>
          <SwipeOutlined
            className={clsx({
              [iconTheme]: true,
              [style.blueIcon]: dragDropMode.isOn,
              [style.disabledIcon]: deleteMode.isOn
            })}
          />
        </IconButton>
      </Tooltip>
      {onboarding?.dragDropMode && anchorRef.current && (
        <Onboarding
          open={onboarding.dragDropMode}
          anchorElement={anchorRef.current}
          nextElement="myLocation"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          title={t('Onboarding.DragDropModeTitle')}
          text={t('Onboarding.DragDropModeContent')}
        />
      )}
    </div>
  );
};

export default DragDropMode;
