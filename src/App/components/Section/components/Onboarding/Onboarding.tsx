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

  return (
    <Popover
      open={open}
      anchorEl={anchorElement}
      onClose={finish}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      marginThreshold={32}
      PaperProps={{
        classes: { root: style.paper }
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={finish}>Skip</Button>
        <Button onClick={() => next(nextElement)}>Next</Button>
      </DialogActions>
    </Popover>
  );
};

export default Onboarding;
