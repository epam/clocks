import React, { useState, useCallback, useMemo, useEffect } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { IconButton, Drawer, Tooltip } from '@mui/material';
import { Add, Close } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useLocations from '../../../../hooks/useLocations';
import useSnackbar from '../../../../hooks/useSnackbar';
import useDebounce from '../../../../hooks/useDebounce';
import { ILocation, IInitialState, IUrlLocations, IUrlLocation } from '../../../../redux/types';

import style from './AddLocation.module.scss';

const AddLocation: React.FC = () => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const inputTheme = useTheme(style.lightInput, style.darkInput);
  const foundLocationTheme = useTheme(style.lightFoundLocation, style.darkFoundLocation);

  const { t } = useTranslation();

  const { snackbarError } = useSnackbar();

  const { locations, setLocations } = useLocations();

  const { deleteMode, locationsDB } = useSelector((state: IInitialState) => state);

  const [isPanelOpen, setPanel] = useState(false);

  const [searchText, setSearchText] = useState('');

  const [locationsFound, setLocationsFound] = useState<ILocation[]>([]);

  const debounce = useDebounce(searchText);

  const handleSearch = useCallback((text: string) => {
    if (!!text) {
      const filter = locationsDB.filter(
        location =>
          !!location.city.match(new RegExp(text, 'gi')) ||
          !!location.names.match(new RegExp(text, 'gi'))
      );

      setLocationsFound(filter);
    } else {
      setLocationsFound([]);
    }
    // don't need as a dependancy locationsDB
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleSearch(debounce);
  }, [debounce, handleSearch]);

  const handleOpenPanel = () => {
    setPanel(true);
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
              lat: location.lat
            }
          };

          setLocations(locationObj);
          handleClosePanel();
        }
      } else {
        const locationObj: IUrlLocations = {
          [location.city + location.lat]: {
            city: location.city,
            lat: location.lat
          }
        };
        setLocations(locationObj);
        handleClosePanel();
      }
    },
    [locations, setLocations, t, snackbarError]
  );

  const searchResultsRender = useMemo(
    () =>
      locationsFound.map((location: ILocation, index: number) => (
        <div
          key={index + 'FOUND_LOCATION'}
          className={foundLocationTheme}
          onClick={() => handleSelectLocation(location)}
        >
          <div className={style.title}>{location.city}</div>
          <div>
            {location.country}, {location.province}
          </div>
        </div>
      )),
    [locationsFound, foundLocationTheme, handleSelectLocation]
  );

  const tooltipText = useMemo((): string => t('AddLocation.ButtonTooltip'), [t]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton onClick={handleOpenPanel} disabled={deleteMode}>
          <Add className={clsx({ [iconTheme]: true, [style.disabledIcon]: deleteMode })} />
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
              onChange={e => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
          <div className={style.searchResultsContainer}>
            {!!locationsFound.length ? (
              searchResultsRender
            ) : (
              <div className={style.notFound}>{t('AddLocation.NotFound')}</div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AddLocation;
