import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip, Slider } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';
import { setPlanningMode } from '../../../../redux/actions';

import { TSliderType } from './PlanningMode.types';
import { SLIDER_TYPE } from './PlannigMode.constants';
import style from './PlanningMode.module.scss';

import Onboarding from '../../../Section/components/Onboarding/Onboarding';

const PlanningMode: React.FC = () => {
  const anchorRef = useRef(null);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { planningMode, deleteMode, onboarding } = useSelector((state: IInitialState) => state);

  const tooltipText = useMemo((): string => t('PlanningMode.ButtonTooltip'), [t]);

  const [sliderType, setSliderType] = useState<TSliderType>(SLIDER_TYPE.HORIZONTAL);

  useEffect(() => {
    window.innerWidth < 601
      ? setSliderType(SLIDER_TYPE.VERTICAL)
      : setSliderType(SLIDER_TYPE.HORIZONTAL);
  }, [planningMode.isOn]);

  const sliderText = useCallback((value: number) => {
    const hours = String(value).split('.')[0];
    const minutes = Math.abs(60 * (value - Number(hours)));
    return `${hours ? hours + 'h' : ''} ${minutes ? minutes + 'm' : ''}`;
  }, []);

  const handleSetPlanningMode = useCallback(() => {
    dispatch(
      setPlanningMode({
        isOn: !planningMode.isOn,
        additionalHours: planningMode.additionalHours
      })
    );
  }, [dispatch, planningMode.isOn, planningMode.additionalHours]);

  const handleChangeAdditionalHours = useCallback(
    (event: Event, newValue: any) => {
      if (typeof newValue === 'number') {
        dispatch(setPlanningMode({ isOn: true, additionalHours: newValue }));
      }
    },
    [dispatch]
  );

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton ref={anchorRef} onClick={handleSetPlanningMode} disabled={deleteMode.isOn}>
          <HistoryIcon
            className={clsx({
              [iconTheme]: true,
              [style.disabledIcon]: deleteMode.isOn,
              [style.blueIcon]: planningMode.isOn
            })}
          />
        </IconButton>
      </Tooltip>

      {planningMode.isOn && (
        <div
          className={clsx({
            [style.sliderContainerHorizontal]: sliderType === SLIDER_TYPE.HORIZONTAL,
            [style.sliderContainerVertical]: sliderType === SLIDER_TYPE.VERTICAL
          })}
        >
          <div
            className={clsx(bodyTheme, style.sliderBody, {
              [style.sliderBodyHorizontal]: sliderType === SLIDER_TYPE.HORIZONTAL,
              [style.sliderBodyVertical]: sliderType === SLIDER_TYPE.VERTICAL
            })}
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
              onChange={handleChangeAdditionalHours}
              classes={{
                root: style.sliderRoot,
                rail: style.sliderRail,
                track: style.sliderTrack,
                thumb: style.sliderThumb
              }}
            />
          </div>
        </div>
      )}

      {onboarding?.planningMode && anchorRef.current && (
        <Onboarding
          open={onboarding.planningMode}
          anchorElement={anchorRef.current}
          nextElement="dragDropMode"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          title={t('Onboarding.PlanningModeTitle')}
          text={t('Onboarding.PlanningModeContent')}
        />
      )}
    </>
  );
};

export default PlanningMode;
