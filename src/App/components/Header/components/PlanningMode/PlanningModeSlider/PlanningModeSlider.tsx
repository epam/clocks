import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Slider } from '@mui/material';
import clsx from 'clsx';

import { IInitialState } from '../../../../../redux/types';
import { setPlanningMode } from '../../../../../redux/actions';

import style from './PlanningModeSlider.module.scss';

const PlanningModeSlider: React.FC = () => {
  const { planningMode, settings } = useSelector((state: IInitialState) => state);

  const dispatch = useDispatch();
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

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch(setPlanningMode({ status: planningMode.isOn, additionalHours: newValue }));
    }
  };
  return (
    <div
      className={clsx(
        { [style[`slider-box-${sliderType}`]]: true },
        { [style[`slider-box-${sliderType}`]]: true },
        { [style.sliderBoxInvisible]: !planningMode.isOn }
      )}
    >
      <div
        className={clsx(
          style.slider,
          { [style[`slider-${settings.theme}`]]: true },
          { [style[`slider-${sliderType}`]]: true },
          { [style[`slider-${sliderType}`]]: true }
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
            thumb: style.sliderThumb,
            mark: clsx({ [style[`slider-mark-${settings.theme}`]]: true }, style.sliderMark),
            markLabel: clsx(
              { [style[`slider-mark-${settings.theme}`]]: true },
              style.sliderMarkLabel
            )
          }}
        />
      </div>
    </div>
  );
};

export default PlanningModeSlider;
