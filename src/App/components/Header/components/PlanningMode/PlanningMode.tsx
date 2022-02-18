import React, { useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip, Slider } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';
import { setPlanningMode } from '../../../../redux/actions';

import style from './PlanningMode.module.scss';

const DeleteMode: React.FC = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { planningMode, deleteMode, settings } = useSelector((state: IInitialState) => state);

  const tooltipText = useMemo((): string => t('PlanningMode.ButtonTooltip'), [t]);

  const [sliderType, setSliderType] = useState<'vertical' | 'horizontal'>('horizontal');

  useEffect(() => {
    if (window.innerWidth < 601) {
      setSliderType('vertical');
    } else {
      setSliderType('horizontal');
    }
    return window.addEventListener('resize', () => {
      if (window.innerWidth < 601) {
        setSliderType('vertical');
      } else {
        setSliderType('horizontal');
      }
    });
  }, []);

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

  const handleSetPlanningMode = useCallback(() => {
    dispatch(
      setPlanningMode({
        isOn: !planningMode.isOn,
        additionalHours: planningMode.additionalHours
      })
    );
  }, [dispatch, planningMode.isOn, planningMode.additionalHours]);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        dispatch(setPlanningMode({ isOn: true, additionalHours: newValue }));
      }
    },
    [dispatch]
  );

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton onClick={handleSetPlanningMode} disabled={deleteMode.isOn}>
          <HistoryIcon
            className={clsx({
              [iconTheme]: true,
              [style.disabledIcon]: deleteMode.isOn,
              [style.blueIcon]: planningMode.isOn
            })}
          />
        </IconButton>
      </Tooltip>
      <div
        className={clsx(
          { [style.sliderContainerHorizontal]: sliderType === 'horizontal' },
          { [style.sliderContainerVertical]: sliderType === 'vertical' },
          { [style.sliderContainerInvisible]: !planningMode.isOn }
        )}
      >
        <div
          className={clsx(
            style.sliderBody,
            { [style.lightBody]: settings.theme === 'light' },
            { [style.darkBody]: settings.theme === 'dark' },
            { [style.sliderBodyHorizontal]: sliderType === 'horizontal' },
            { [style.sliderBodyVertical]: sliderType === 'vertical' }
          )}
        >
          <Slider
            orientation={sliderType}
            min={-12}
            defaultValue={0}
            value={planningMode.additionalHours}
            getAriaValueText={sliderText}
            valueLabelFormat={sliderText}
            max={12}
            step={0.25}
            valueLabelDisplay="on"
            onChange={handleChange}
            classes={{
              root: style.sliderRoot,
              rail: style.sliderRail,
              track: style.sliderTrack,
              thumb: style.sliderThumb
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteMode;
