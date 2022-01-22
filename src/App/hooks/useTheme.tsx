import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { IInitialState } from '../redux/types';
import { THEME } from '../redux/constants';

const useTheme = (lightClass: string, darkClass: string) => {
  const [currentTheme, setCurrentTheme] = useState(lightClass);

  const { theme } = useSelector((state: IInitialState) => state);

  useEffect(() => {
    setCurrentTheme(theme === THEME.light ? lightClass : darkClass);
  }, [theme, lightClass, darkClass]);

  return currentTheme;
};

export default useTheme;
