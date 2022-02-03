import React, { useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip, Slider } from '@mui/material';
import NextPlanOutlinedIcon from '@mui/icons-material/NextPlanOutlined';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';
import { setPlanningMode } from '../../../../redux/actions';
import { CLOCK_MARKS } from '../../../../redux/constants';

import style from './PlanningMode.module.scss';

const DeleteMode: React.FC = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { planningMode, deleteMode, additionalHours } = useSelector(
    (state: IInitialState) => state
  );

  const handleSetPlanningMode = () => {
    dispatch(setPlanningMode({ status: !planningMode, additionalHours }));
  };

  const tooltipText = useMemo((): string => t('Planning mode'), [t]);

  const sliderText = (value: number) => {
    const integerPart = value > 0 ? Math.floor(value) : Math.ceil(value);
    const decimalPart = value - integerPart;
    if (integerPart === value) {
      return value > 0 ? `+${value}h` : value < 0 ? `${value}h` : '0';
    } else if (integerPart === 0) {
      return value > 0 ? `+${60 * decimalPart}m` : value < 0 ? `${60 * decimalPart}m` : '0';
    } else {
      return value > 0
        ? `+${integerPart}h ${60 * decimalPart}m`
        : value < 0
        ? `${integerPart}h ${Math.abs(60 * decimalPart)}m`
        : '0';
    }
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch(setPlanningMode({ status: planningMode, additionalHours: newValue }));
    }
  };

  return (
    <>
      <div className={style.slider}>
        <Slider
          min={-12}
          defaultValue={0}
          value={additionalHours}
          getAriaValueText={sliderText}
          valueLabelFormat={sliderText}
          max={12}
          step={0.25}
          valueLabelDisplay="auto"
          onChange={handleChange}
          track={false}
          marks={CLOCK_MARKS}
        />
      </div>
      <Tooltip title={tooltipText} arrow>
        <IconButton onClick={handleSetPlanningMode} disabled={deleteMode}>
          <NextPlanOutlinedIcon
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
