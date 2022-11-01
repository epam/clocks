import { MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';

import { IInitialState } from '../../../../../../../../redux/types';
import { ICustomMenuItemProps } from './CustomMenuItem.types';

import useCountryToAbbreviation from '../../../../../../../../hooks/useCountryToAbbreviation';
import useTheme from '../../../../../../../../hooks/useTheme';
import useFlag from '../../../../../../../../hooks/useFlag/useFlag';

import style from '../../DrawerBlock.module.scss';

const CustomMenuItem = ({ index, location, handleSelectLocation }: ICustomMenuItemProps) => {
  const flag = useFlag();
  const foundLocationTheme = useTheme(style.lightFoundLocation, style.darkFoundLocation);
  const { displayFlagInSearch, showTimezone } = useSelector(
    (state: IInitialState) => state.settings
  );
  const abbreviation = useCountryToAbbreviation(location.timezone);
  return (
    <MenuItem
      tabIndex={1}
      key={index + 'FOUND_LOCATION'}
      className={foundLocationTheme}
      onClick={() => handleSelectLocation(location)}
    >
      <div className={style.foundLocationDetailsContainer}>
        <div className={displayFlagInSearch ? style.flagContainer : ''}>
          {displayFlagInSearch && flag(location.iso2)}
        </div>
        <div>
          <div className={style.title}>{location.city}</div>
          <div className={style.zone}>
            {location.country}
            {!!location.province && ','} {location.province}
          </div>
          <div className={style.timezone}>
            {location.timezone}
            {showTimezone && `, ${abbreviation}`}
          </div>
        </div>
      </div>
    </MenuItem>
  );
};

export default CustomMenuItem;
