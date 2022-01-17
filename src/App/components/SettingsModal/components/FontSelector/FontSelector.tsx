import { FC } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { styled } from '@mui/material/styles';

import { CLOCKS_FONTS } from '../../../../lib/constants';

import { IFontSelectorProps } from './FontSelector.interface';
import styles from './FontSelector.module.scss';

// Temporary styled Select , to be deleted when moving to EPAM UI
const EPAMBlueSelect = styled(Select)(({ theme }) => ({
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#39c2d7'
    }
  }
}));

const FontSelector: FC<IFontSelectorProps> = ({
  font,
  changeHandler,
  className
}) => {
  return (
    <EPAMBlueSelect
      variant="outlined"
      className={`${styles.select} ${className}`}
      onChange={(e: any) => changeHandler(e.target.value)}
      value={font.value}
    >
      {Object.values(CLOCKS_FONTS).map((font, index) => (
        <MenuItem value={font.value} key={`FONT${index}`}>
          {font.label}
        </MenuItem>
      ))}
    </EPAMBlueSelect>
  );
};

export default FontSelector;
