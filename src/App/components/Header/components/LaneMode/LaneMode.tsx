import React, { useMemo, useRef } from 'react';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { IconButton, Tooltip } from '@mui/material';
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

  const handleSetLaneMode = () => {
    dispatch(
      setLaneMode({
        isOn: !laneMode.isOn
      })
    );
  };

  return (
    <div>
      <Tooltip title={tooltipText} arrow>
        <IconButton ref={anchorRef} onClick={handleSetLaneMode} disabled={deleteMode.isOn}>
          <HistoryToggleOffIcon
            className={clsx({
              [iconTheme]: true,
              [style.disabledIcon]: deleteMode.isOn,
              [style.blueIcon]: planningMode.isOn
            })}
          />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LaneMode;
