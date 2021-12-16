import { createTheme, Theme } from '@material-ui/core';

const customStyles = {
  light: {},
  dark: {}
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
