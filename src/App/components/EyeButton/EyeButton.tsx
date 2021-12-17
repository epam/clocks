import { FC } from 'react';
import { IconButton } from '@material-ui/core';
import { VisibilityOutlined, VisibilityOffOutlined } from '@mui/icons-material';

import { IEyeButtonProps } from './EyeButton.interface';

import styles from './EyeButton.module.scss';

const EyeButton: FC<IEyeButtonProps> = ({ isOpen, eyeHandler }) => {
  const EyeHandler = () => {
    eyeHandler(!isOpen);
  };
  return (
    <div className={styles.eye}>
      <IconButton onClick={EyeHandler}>
        {isOpen ? (
          <VisibilityOutlined data-testid="open-eye-icon" fontSize="small" />
        ) : (
          <VisibilityOffOutlined
            data-testid="closed-eye-icon"
            fontSize="small"
          />
        )}
      </IconButton>
    </div>
  );
};

export default EyeButton;
