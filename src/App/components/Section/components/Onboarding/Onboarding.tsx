import React, { FC } from 'react';
import useOnboarding from '../../../../hooks/useOnboarding';
import {
  Popover,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import { IOnboardingProps } from './Onboarding.interface';
import style from './Onboarding.module.scss';

const Onboarding: FC<IOnboardingProps> = ({
  open,
  anchorElement,
  nextElement,
  anchorOrigin,
  transformOrigin,
  title,
  text
}) => {
  const { finish, next } = useOnboarding();

  const position = anchorElement.getBoundingClientRect();

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
        <Button onClick={finish}>Skip</Button>
        <Button onClick={() => (nextElement ? next(nextElement) : finish())}>
          {nextElement ? 'Next' : 'Finish'}
        </Button>
      </DialogActions>
    </Popover>
  );
};

export default Onboarding;
