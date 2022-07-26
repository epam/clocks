import React, { useCallback, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { countryCodeEmoji } from 'country-code-emoji';

import { IconButton, Drawer, MenuList, MenuItem } from '@mui/material';
import { Close } from '@mui/icons-material';

import useSnackbar from '../../../../../../hooks/useSnackbar';
import { ILocation, IUrlLocations, IUrlLocation } from '../../../../../../redux/types';
import useLocations from '../../../../../../hooks/useLocations';
import useTheme from '../../../../../../hooks/useTheme';

import { KEYBOARD } from '../../AddLocation.constants';

import style from './DrawerBlock.module.scss';
import { IDrawerBlockProps } from './DrawerBlock.types';

const DrawerBlock: React.FC<IDrawerBlockProps> = ({
  setSearchText,
  setPanel,
  setLocationsFound,
  isPanelOpen,
  searchText,
  locationsFound
}) => {
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const inputTheme = useTheme(style.lightInput, style.darkInput);
  const foundLocationTheme = useTheme(style.lightFoundLocation, style.darkFoundLocation);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  
  const { t } = useTranslation();

  const { snackbarError } = useSnackbar();

  const { locations, setLocations, getLocationOffset } = useLocations();

  const handleClosePanel = useCallback(() => {
    setPanel(false);
    setLocationsFound([]);
    setSearchText('');
  }, [setSearchText, setLocationsFound, setPanel]);

  const handleSelectLocation = useCallback(
    (location: ILocation) => {
      if (locations) {
        const find = Object.values(locations).find(
          (urlLocation: IUrlLocation) =>
            urlLocation.city === location.city && urlLocation.lat === location.lat
        );

        if (find) {
          snackbarError(t('AddLocation.SnackbarMessage'));
        } else {
          const locationObj: IUrlLocations = {
            ...locations,
            [location.city + location.lat]: {
              city: location.city,
              lat: location.lat,
              offset: getLocationOffset(location.timezone)
            }
          };

          setLocations(locationObj);
          handleClosePanel();
        }
      } else {
        const locationObj: IUrlLocations = {
          [location.city + location.lat]: {
            city: location.city,
            lat: location.lat,
            offset: getLocationOffset(location.timezone)
          }
        };
        setLocations(locationObj);
        handleClosePanel();
      }
    },
    [locations, setLocations, t, snackbarError, getLocationOffset, handleClosePanel]
  );

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === KEYBOARD.plus || value === KEYBOARD.plus) return;
    setSearchText(value);
  };

  return (
    <Drawer anchor="right" open={isPanelOpen} onClose={handleClosePanel}>
      <div className={bodyTheme}>
        <div className={style.header}>
          <div className={style.title}>{t('AddLocation.PanelTitle')}</div>
          <IconButton onClick={handleClosePanel}>
            <Close className={iconTheme} />
          </IconButton>
        </div>
        <div className={style.inputContainer}>
          <input
            type="text"
            className={inputTheme}
            placeholder={t('AddLocation.InputPlaceholder')}
            onChange={inputChangeHandler}
            value={searchText}
            autoFocus={true}
          />
        </div>
        <MenuList className={style.searchResultsContainer}>
          {!!locationsFound.length ? (
            locationsFound.map((location: ILocation, index: number) => (
              <MenuItem
                tabIndex={1}
                key={index + 'FOUND_LOCATION'}
                className={foundLocationTheme}
                onClick={() => handleSelectLocation(location)}
              >
                <div className={style.foundLocationDetailsContainer}>
                  <div className={style.flagContainer}>
                    {countryCodeEmoji(location.iso2)}
                  </div>
                  <div>
                    <div className={style.title}>{location.city}</div>
                    <div className={style.zone}>
                      {location.country}
                      {!!location.province && ','} {location.province}
                    </div>
                    <div className={style.timezone}>{location.timezone}</div>
                  </div>
                </div>
              </MenuItem>
            ))
          ) : (
            <div className={style.notFound}>{t('AddLocation.NotFound')}</div>
          )}
        </MenuList>
      </div>
    </Drawer>
  );
};

export default DrawerBlock;
