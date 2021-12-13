import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

import { IEyeButtonProps } from './EyeButton.interface';

const useStyles = makeStyles(theme => ({
  eye: {
    position: 'absolute',
    right: '0',
    top: '10px',
    transform: 'translate(110%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const EyeButton: FC<IEyeButtonProps> = ({ isOpen, eyeHandler }) => {
  const classes = useStyles();

  const EyeHandler = () => {
    eyeHandler(!isOpen);
  };
  return (
    <IconButton className={classes.eye} onClick={EyeHandler}>
      {isOpen ? (
        <VisibilityOutlined data-testid="open-eye-icon" fontSize="small" />
      ) : (
        <VisibilityOffOutlined data-testid="closed-eye-icon" fontSize="small" />
      )}
    </IconButton>
  );
};

export default EyeButton;
