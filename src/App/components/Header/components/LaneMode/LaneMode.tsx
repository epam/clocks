import { useMemo, useRef } from 'react';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Onboarding from '../../../Section/components/Onboarding/Onboarding';
import { setLaneMode } from '../../../../redux/actions';

import style from './LaneMode.module.scss';
import { IInitialState } from '../../../../redux/types';

const LaneMode = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000'
      }
    }
  });

  const anchorRef = useRef(null);
  const { onboarding } = useSelector((state: IInitialState) => state);

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
    <>
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
                <Button className={style.buttonly} onClick={handleOnLaneMode} ref={anchorRef}>
                  {t('LaneMode')}
                </Button>
              </Tooltip>

              <Button className={style.buttonly} onClick={handleOffLaneMode}>
                {t('Grid Mode')}
              </Button>
            </ButtonGroup>
          </ThemeProvider>
        </div>
      </div>

      {onboarding?.laneMode && anchorRef.current && (
        <Onboarding
          open={onboarding.laneMode}
          anchorElement={anchorRef.current}
          nextElement={'myLocation'}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          title={t('Onboarding.LaneModeTitle')}
          text={t('Onboarding.LaneModeContent')}
        />
      )}
    </>
  );
};

export default LaneMode;
