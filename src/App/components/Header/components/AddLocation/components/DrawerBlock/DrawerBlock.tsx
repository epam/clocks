import React, { useCallback, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { IconButton, Drawer, MenuList } from '@mui/material';
import { Close } from '@mui/icons-material';

import useSnackbar from '../../../../../../hooks/useSnackbar';
import { ILocation, IUrlLocations, IUrlLocation } from '../../../../../../redux/types';
import useLocations from '../../../../../../hooks/useLocations';
import useTheme from '../../../../../../hooks/useTheme';

import { KEYBOARD } from '../../AddLocation.constants';

import style from './DrawerBlock.module.scss';
import { IDrawerBlockProps } from './DrawerBlock.types';
import CustomMenuItem from './components/MenuItem/CustomMenuItem';
import { setUserLocation } from '../../../../../../redux/actions';

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
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

  const { snackbarError } = useSnackbar();

  const { locations, setLocations, getLocationOffset } = useLocations();

  const dispatch = useDispatch();

  const handleClosePanel = useCallback(() => {
    setPanel(false);
    setLocationsFound([]);
    setSearchText('');
  }, [setSearchText, setLocationsFound, setPanel]);

  const handleSelectLocation = useCallback(
    (location: ILocation) => {
      if (Object.values(locations).length > 0) {
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
            userLocation: true,
            offset: getLocationOffset(location.timezone)
          }
        };
        setLocations(locationObj);
        dispatch(setUserLocation(location));
        handleClosePanel();
      }
    },
    // don't need as a dependency dispatch
    // eslint-disable-next-line
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
          {!!locationsFound.length &&
            locationsFound.map((location: ILocation, index: number) => (
              <CustomMenuItem
                index={index}
                location={location}
                handleSelectLocation={handleSelectLocation}
              />
            ))}
          {locationsFound.length === 0 && searchText !== '' && (
            <div className={style.notFound}>{t('AddLocation.NotFound')}</div>
          )}
        </MenuList>
      </div>
    </Drawer>
  );
};

export default DrawerBlock;
