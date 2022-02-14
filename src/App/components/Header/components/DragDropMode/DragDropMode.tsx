import { IconButton } from '@mui/material';
import { LibraryBooksOutlined } from '@mui/icons-material';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import useTheme from '../../../../hooks/useTheme';
import { IInitialState } from '../../../../redux/types';

import style from './DragDropMode.module.scss';
import { setDragDropMode } from '../../../../redux/actions';

const DragDropMode = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { deleteMode } = useSelector((state: IInitialState) => state);
  const { dragDropMode } = useSelector((state: IInitialState) => state);

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
