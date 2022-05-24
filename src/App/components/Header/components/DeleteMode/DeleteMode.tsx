import React, { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useLocations from '../../../../hooks/useLocations/useLocations';
import { IInitialState } from '../../../../redux/types';
import { setDeleteMode } from '../../../../redux/actions';

import style from './DeleteMode.module.scss';
import Onboarding from '../../../Section/components/Onboarding/Onboarding';

const DeleteMode: React.FC = () => {
  const anchorRef = useRef(null);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { deleteMode, onboarding, dragDropMode, planningMode } = useSelector(
    (state: IInitialState) => state
  );

  const { locations } = useLocations();

  useEffect(() => {
    if (!locations) {
      dispatch(setDeleteMode(false));
    }
  }, [dispatch, locations]);

  const handleSetDeleteMode = () => {
    dispatch(setDeleteMode(!deleteMode.isOn));
  };

  const tooltipText = useMemo((): string => t('DeleteMode.ButtonTooltip'), [t]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton
          ref={anchorRef}
          onClick={handleSetDeleteMode}
          disabled={dragDropMode.isOn || planningMode.isOn}
        >
          <DeleteOutline
            className={clsx({
              [iconTheme]: true,
              [style.redIcon]: deleteMode.isOn,
              [style.disabledIcon]: dragDropMode.isOn || planningMode.isOn
            })}
          />
        </IconButton>
      </Tooltip>
      {onboarding?.deleteButton && anchorRef.current && (
        <Onboarding
          open={onboarding.deleteButton}
          anchorElement={anchorRef.current}
          nextElement="planningMode"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          title={t('Onboarding.DeleteLocationTitle')}
          text={t('Onboarding.DeleteLocationContent')}
        />
      )}
    </>
  );
};

export default DeleteMode;
