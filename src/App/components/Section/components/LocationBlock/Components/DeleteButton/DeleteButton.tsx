import React from 'react';

import { Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import useLocations from '../../../../../../hooks/useLocations';

import style from '../../LocationBlock.module.scss';
import { IDeleteButtonProps } from './DeleteButton.types';

const DeleteButton: React.FC<IDeleteButtonProps> = ({ location }) => {
  const { locations, setLocations } = useLocations();

  const handleDelete = () => {
    location && delete locations[location?.city + location?.lat];
    setLocations(locations);
  };

  return (
    <div>
      <IconButton className={style.deleteButton} size="small" onClick={handleDelete}>
        <Remove className={style.icon} />
      </IconButton>
    </div>
  );
};

export default DeleteButton;
