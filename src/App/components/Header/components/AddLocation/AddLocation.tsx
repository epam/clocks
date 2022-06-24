import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { matchSorter } from 'match-sorter';

import { IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import Onboarding from '../../../Section/components/Onboarding/Onboarding';

import useTheme from '../../../../hooks/useTheme';

import useDebounce from '../../../../hooks/useDebounce/useDebounce';
import { ILocation, IInitialState } from '../../../../redux/types';
import { timezonesDB } from '../../../../redux/timezonesDB';

import style from './AddLocation.module.scss';
import { KEYBOARD } from './AddLocation.constants';
import DrawerBlock from './components/DrawerBlock/DrawerBlock';

const AddLocation: React.FC = () => {
  const anchorRef = useRef(null);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { t } = useTranslation();

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
    const isCityNameContainsMultipleValues = (text: string, location: ILocation) => {
      const words = text.split(' ');
      return words.every(word => new RegExp(word, 'gi').test(location.city));
    };

    let filter = locationsDB.filter(
      location =>
        isCityNameContainsMultipleValues(text, location) ||
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
    // don't need as a dependancy listener
    // eslint-disable-next-line
  }, []);

  const handleOpenPanel = () => {
    setPanel(true);
  };

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

      <DrawerBlock
        setSearchText={setSearchText}
        setPanel={setPanel}
        setLocationsFound={setLocationsFound}
        isPanelOpen={isPanelOpen}
        searchText={searchText}
        locationsFound={locationsFound}
      />

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
