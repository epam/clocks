import React, { useMemo, useRef } from 'react';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { Button, IconButton, Tooltip } from '@mui/material';
import clsx from 'clsx';
import style from './LaneMode.module.scss';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialState } from '../../../../redux/types';
import useTheme from '../../../../hooks/useTheme';
import { setLaneMode } from '../../../../redux/actions';

const LaneMode = () => {
  const anchorRef = useRef(null);
  const dispatch = useDispatch();

  const { planningMode, deleteMode, laneMode } = useSelector((state: IInitialState) => state);

  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const tooltipText = useMemo((): string => t('LaneMode.ButtonTooltip'), [t]);

  const handleOnLaneMode = () => {
    dispatch(
      setLaneMode({
        isOn: true
      })
    );
  };

  const handleOffLaneMode = () => {
    dispatch(
      setLaneMode({
        isOn: false
      })
    );
  };

  return (
    <div>
      <div className={style.buttonContainer}>
        <Tooltip title={tooltipText} arrow>
          <Button className={style.buttonly} onClick={handleOnLaneMode}>
            {t('LaneMode')}
          </Button>
        </Tooltip>

        <Button className={style.buttonly} onClick={handleOffLaneMode}>
          {t('Custom Mode')}
        </Button>
      </div>
    </div>
  );
};

export default LaneMode;
