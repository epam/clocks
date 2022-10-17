import React, { useMemo } from 'react';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import style from './LaneMode.module.scss';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
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

  const dispatch = useDispatch();

  const tooltipText = useMemo((): string => t('LaneMode.ButtonTooltip'), []);

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
