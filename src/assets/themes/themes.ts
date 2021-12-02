import { createTheme, Theme } from '@material-ui/core';
import { EpamColors, Colors } from '../../constants/colors';

const customStyles = {
  light: {
    background: {
      default: EpamColors.white
    },
    primary: {
      main: EpamColors.epamBlue
    },
    grey: {
      300: Colors.gray
    },
    text: {
      primary: '#000'
    }
  },
  dark: {
    background: {
      default: EpamColors.graphite
    },
    primary: {
      main: EpamColors.brightBlue
    },
    grey: {
      300: EpamColors.lightGray
    },
    text: {
      primary: '#fff'
    }
  }
};

const themes = (type: 'light' | 'dark'): Theme => {
  return createTheme({
    palette: {
      type,
      ...customStyles[type]
    }
  });
};

export default themes;
