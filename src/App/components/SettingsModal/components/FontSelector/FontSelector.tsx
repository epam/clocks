import { FC } from 'react';
import { MenuItem, Select } from '@material-ui/core';

import { CLOCKS_FONTS } from '../../../../lib/constants';

import { IFontSelectorProps } from './FontSelector.interface';
import styles from './FontSelector.module.scss';

const FontSelector: FC<IFontSelectorProps> = ({ font, changeHandler }) => {
  return (
    <Select
      variant="outlined"
      className={styles.select}
      onChange={(e: any) => changeHandler(e.target.value)}
      value={font}
    >
      {Object.values(CLOCKS_FONTS).map((font, index) => (
        <MenuItem value={font.value} key={`FONT${index}`}>
          {font.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FontSelector;
