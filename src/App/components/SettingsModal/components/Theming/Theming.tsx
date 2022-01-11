import { Button, FormControlLabel, Switch } from '@material-ui/core';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import { FC, useMemo } from 'react';

import { checkComputerThemeSupport } from '../../../../handlers';
import { THEMES } from '../../../../redux/themeRedux/theme.constants';

import { IThemingProps } from './Theming.interface';
import styles from './Theming.module.scss';

// Temporary styled Switch , to be deleted when moving to EPAM UI
const EPAMBlueSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#39c2d7',
    '&:hover': {
      backgroundColor: alpha('#39c2d7', theme.palette.action.hoverOpacity)
    }
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#39c2d7'
  }
}));

const Theming: FC<IThemingProps> = ({
  autoTheming = false,
  autoThemingHandler,
  theme = THEMES.light,
  themeHandler
}) => {
  const doesComputerSupportTheming = useMemo(
    () => checkComputerThemeSupport(),
    []
  );
  return (
    <>
      {doesComputerSupportTheming && (
        <FormControlLabel
          classes={{ root: `${styles.default}` }}
          control={
            <EPAMBlueSwitch
              checked={autoTheming}
              onChange={autoThemingHandler}
              name="checkedB"
              color="primary"
              className={styles.switch}
            />
          }
          label="Auto theming"
          labelPlacement="start"
        />
      )}
      <span className={styles['margin-block']} />
      <Button
        variant="outlined"
        onClick={themeHandler}
        disabled={autoTheming}
        endIcon={theme === 'light' ? <Brightness7 /> : <Brightness4 />}
        classes={{ root: styles['mode-control-btn'] }}
        className={styles['mode-control-btn']}
      >
        {theme === 'light' ? 'LIGHT' : 'DARK'}
      </Button>
    </>
  );
};

export default Theming;
