import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from '@mui/material';
import { LibraryBooksOutlined } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';
import { setDragDropMode } from '../../../../redux/actions';

import style from './DragDropMode.module.scss';

const DragDropMode = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { deleteMode, dragDropMode } = useSelector((state: IInitialState) => state);

  const dispatch = useDispatch();

  const handleSetDragDropMode = () => {
    dispatch(setDragDropMode(!dragDropMode.isOn));
  };

  return (
    <IconButton onClick={handleSetDragDropMode}>
      <LibraryBooksOutlined
        className={clsx({
          [iconTheme]: true,
          [style.blueIcon]: dragDropMode.isOn,
          [style.disabledIcon]: deleteMode.isOn
        })}
      />
    </IconButton>
  );
};

export default DragDropMode;
