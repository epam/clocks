import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

const useStyles = makeStyles(theme => ({
  eye: {
    position: 'absolute',
    right: '0',
    top: '10px',
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
      {isOpen ? (
        <VisibilityOutlined fontSize="small" />
      ) : (
        <VisibilityOffOutlined fontSize="small" />
      )}
    </IconButton>
  );
};

export default EyeButton;
