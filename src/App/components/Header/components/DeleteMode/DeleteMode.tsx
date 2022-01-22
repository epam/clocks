import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton, Tooltip } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useLocations from '../../../../hooks/useLocations';
import { IInitialState } from '../../../../redux/types';
import { setDeleteMode } from '../../../../redux/actions';

import style from './DeleteMode.module.scss';

const DeleteMode: React.FC = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { deleteMode } = useSelector((state: IInitialState) => state);

  const { locations } = useLocations();

  useEffect(() => {
    if (!locations) {
      dispatch(setDeleteMode(false));
    }
  }, [dispatch, locations]);

  const handleSetDeleteMode = () => {
    dispatch(setDeleteMode(!deleteMode));
  };

  const tooltipText = useMemo((): string => t('DeleteMode.ButtonTooltip'), [t]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton onClick={handleSetDeleteMode}>
          <DeleteOutline
            className={clsx({
              [iconTheme]: true,
              [style.redIcon]: deleteMode
            })}
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeleteMode;
