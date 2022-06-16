import React, { useState, useCallback, useMemo, useEffect, ChangeEvent, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { matchSorter } from 'match-sorter';

import { IconButton, Drawer, Tooltip, MenuList, MenuItem } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import Onboarding from '../../../Section/components/Onboarding/Onboarding';

import useTheme from '../../../../hooks/useTheme';
import useLocations from '../../../../hooks/useLocations';
import useSnackbar from '../../../../hooks/useSnackbar';
import useDebounce from '../../../../hooks/useDebounce/useDebounce';
import { ILocation, IInitialState, IUrlLocations, IUrlLocation } from '../../../../redux/types';

import style from './AddLocation.module.scss';
import { KEYBOARD } from './AddLocation.constants';
import { timezonesDB } from '../../../../redux/timezonesDB';

const AddLocation: React.FC = () => {
  const anchorRef = useRef(null);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const inputTheme = useTheme(style.lightInput, style.darkInput);
  const foundLocationTheme = useTheme(style.lightFoundLocation, style.darkFoundLocation);

  const { t } = useTranslation();

  const { snackbarError } = useSnackbar();

  const { locations, setLocations, getLocationOffset } = useLocations();

  const { deleteMode, onboarding, dragDropMode, planningMode } = useSelector(
    (state: IInitialState) => state
  );

  const { locationsDB } = useSelector((state: IInitialState) => state.locations);

  const [isPanelOpen, setPanel] = useState(false);

  const [searchText, setSearchText] = useState('');

  const [locationsFound, setLocationsFound] = useState<ILocation[]>([]);

  const debounce = useDebounce(searchText);

  const searchByTimezone = (text: string) => {
    let result = locationsDB.filter(location =>
      timezonesDB.timezones[timezonesDB.abbreviations.indexOf(text.toUpperCase())].values.includes(
        location.timezone
      )
    );

    result.sort((a, b) => {
      if (a['city_ascii'] < b['city_ascii']) return -1;
      if (a['city_ascii'] > b['city_ascii']) return 1;
      return 0;
    });
    setLocationsFound(result);
  };

  const searchByLocation = (text: string) => {
    let filter = locationsDB.filter(
      location =>
        !!location.city.match(new RegExp(text, 'gi')) ||
        !!location.names.match(new RegExp(text, 'gi')) ||
        !!location.city_ascii.match(new RegExp(text, 'gi')) ||
        !!location.country.match(new RegExp(text, 'gi')) ||
        !!location.province.match(new RegExp(text, 'gi'))
    );

    const result = matchSorter(filter, text, {
      keys: ['city_ascii', 'city', 'province', 'country', 'names']
    });

    if (result.length) {
      const bestMatch = result[0];
      const rest = result.slice(1, 20);
      rest.sort((a, b) => {
        if (a['city_ascii'] < b['city_ascii']) return -1;
        if (a['city_ascii'] > b['city_ascii']) return 1;
        return 0;
      });
      setLocationsFound([bestMatch, ...rest]);
    }
  };

  const handleSearch = useCallback((text: string) => {
    if (!!text) {
      timezonesDB.abbreviations.includes(text.toUpperCase())
        ? searchByTimezone(text)
        : searchByLocation(text);
    } else {
      setLocationsFound([]);
    }
    // don't need as a dependancy locationsDB
    // eslint-disable-next-line
  }, []);

  const listener = useCallback(({ key }: KeyboardEvent) => {
    if (key === KEYBOARD.plus || key === KEYBOARD.plus) {
      setPanel(true);
    }
  }, []);

  useEffect(() => {
    handleSearch(debounce);
  }, [debounce, handleSearch]);

  useEffect(() => {
    document.addEventListener('keydown', listener);

    return () => window.removeEventListener('keydown', listener);
  }, []);

  const handleOpenPanel = () => {
    setPanel(true);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === KEYBOARD.plus || value === KEYBOARD.plus) return;
    setSearchText(value);
  };

  const handleClosePanel = () => {
    setPanel(false);
    setLocationsFound([]);
    setSearchText('');
  };

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
    [locations, setLocations, t, snackbarError, getLocationOffset]
  );

  const searchResultsRender = useMemo(
    () =>
      locationsFound.map((location: ILocation, index: number) => (
        <MenuItem
          tabIndex={1}
          key={index + 'FOUND_LOCATION'}
          className={foundLocationTheme}
          onClick={() => handleSelectLocation(location)}
        >
          <div className={style.title}>{location.city}</div>
          <div className={style.zone}>
            {location.country}, {location.province}
          </div>

          <div className={style.timezone}>{location.timezone}</div>
        </MenuItem>
      )),
    [locationsFound, foundLocationTheme, handleSelectLocation]
  );

  const tooltipText = useMemo((): string => t('AddLocation.ButtonTooltip'), [t]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton
          ref={anchorRef}
          onClick={handleOpenPanel}
          disabled={deleteMode.isOn || dragDropMode.isOn || planningMode.isOn}
        >
          <Add
            className={clsx({
              [iconTheme]: true,
              [style.disabledIcon]: deleteMode.isOn || dragDropMode.isOn || planningMode.isOn
            })}
          />
        </IconButton>
      </Tooltip>

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
              searchResultsRender
            ) : (
              <div className={style.notFound}>{t('AddLocation.NotFound')}</div>
            )}
          </MenuList>
        </div>
      </Drawer>

      {onboarding?.addCity && anchorRef.current && (
        <Onboarding
          open={onboarding.addCity}
          anchorElement={anchorRef.current}
          nextElement="shareButton"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          title={t('Onboarding.AddLocationTitle')}
          text={t('Onboarding.AddLocationTitle')}
        />
      )}
    </>
  );
};

export default AddLocation;
