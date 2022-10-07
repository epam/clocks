import React, { useMemo, useRef } from 'react';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import { Button, ButtonGroup, IconButton, Tooltip } from '@mui/material';
import clsx from 'clsx';
import style from './LaneMode.module.scss';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialState } from '../../../../redux/types';
import useTheme from '../../../../hooks/useTheme';
import { setLaneMode } from '../../../../redux/actions';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const LaneMode = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000'
      }
    }
  });

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
        <ThemeProvider theme={theme}>
          <ButtonGroup
            color="primary"
            size="small"
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Tooltip title={tooltipText} arrow>
              <Button className={style.buttonly} onClick={handleOnLaneMode}>
                {t('LaneMode')}
              </Button>
            </Tooltip>

            <Button className={style.buttonly} onClick={handleOffLaneMode}>
              {t('Custom Mode')}
            </Button>
          </ButtonGroup>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default LaneMode;
