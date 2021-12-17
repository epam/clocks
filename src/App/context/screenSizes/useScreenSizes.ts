import { useState, useEffect } from 'react';

import { IScreenSizesContext } from './ScreenSizesContext.interface';

export const useScreenSizes = (): IScreenSizesContext => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [showDrawerMobile, setShowDrawerMobile] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);

  const HandleDrawerMobile = (newState: boolean) => {
    setShowDrawerMobile(newState);
  };

  return {
    state: { width, height, showDrawerMobile },
    actions: { HandleDrawerMobile }
  };
};
