import React, { useEffect, useState } from 'react';

import {
  Popover,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';

import useOnboarding from '../../../../hooks/useOnboarding';

import { IOnboardingProps } from './Onboarding.interface';
import style from './Onboarding.module.scss';

const Onboarding: React.FC<IOnboardingProps> = ({
  open,
  anchorElement,
  nextElement,
  anchorOrigin,
  transformOrigin,
  title,
  text
}) => {
  const { finish, next } = useOnboarding();

  const handlePosition = () => anchorElement.getBoundingClientRect();
  const [position, setPosition] = useState(handlePosition);

  useEffect(() => {
    const handleResize = () => setPosition(handlePosition);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

    // do not need handlePosition as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Popover
      open={open}
      anchorEl={anchorElement}
      onClose={() => {}}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      marginThreshold={32}
      PaperProps={{
        classes: { root: style.paper }
      }}
      BackdropProps={{
        classes: { root: style.backdrop },
        children: (
          <div
            className={style.highlighter}
            style={{
              width: position.width + 6,
              height: position.height + 6,
              top: position.top - 3,
              left: position.left - 3
            }}
          />
        )
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {nextElement && (
          <Button className={style.buttonTextColor} onClick={finish}>
            Skip
          </Button>
        )}
        <Button
          className={style.buttonTextColor}
          onClick={() => (nextElement ? next(nextElement) : finish())}
        >
          {nextElement ? 'Next' : 'Finish'}
        </Button>
      </DialogActions>
    </Popover>
  );
};

export default Onboarding;
