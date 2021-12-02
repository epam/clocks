import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { EyeIcon, EyeSlashIcon } from '../../assets/icons/icons';

const useStyles = makeStyles(theme => ({
  eye: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translate(110%, -50%)'
  }
}));

interface IProps {
  isOpen: boolean;
  eyeHandler: (isOpen: boolean) => void;
}

const EyeButton: FC<IProps> = ({ isOpen, eyeHandler }) => {
  const classes = useStyles();

  const EyeHandler = () => {
    eyeHandler(!isOpen);
  };
  return (
    <IconButton
      className={`${classes.eye} content-center`}
      onClick={EyeHandler}
    >
      {isOpen ? <EyeIcon /> : <EyeSlashIcon />}
    </IconButton>
  );
};

export default EyeButton;
