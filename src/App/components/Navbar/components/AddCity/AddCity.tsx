import { FC, useContext, useRef, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  SwipeableDrawer,
  Toolbar,
  Typography,
  IconButton,
  MenuList,
  TextField
} from '@material-ui/core';
import { Close } from '@mui/icons-material';

import CustomItem from '../../../Location/components/CustomItem';
import {
  lookupCityAscii,
  sortBestMatch,
  generateIdFormat
} from '../../../../handlers';
import { LocationsContext } from '../../../../context/locations';
import { ICityData, IMatchingLocation } from '../../../../lib/interfaces';
import { IInputDrawerProps } from './AddCity.interface';

import css from './AddCity.module.scss';

const AddCity: FC<IInputDrawerProps> = ({ visibility, visibilityHandler }) => {
  // @ts-ignore
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const {
    actions: { GetLocationsFromUrl, AddLocation }
  } = useContext(LocationsContext);
  const { t } = useTranslation();

  const [cities, setCities] = useState<IMatchingLocation[]>([]);
  const [value, setValue] = useState<string>('');
  const input = useRef<HTMLInputElement>(null);

  const urlLocations = useMemo(() => {
    if (GetLocationsFromUrl) {
      return new Set(GetLocationsFromUrl());
    }
  }, [GetLocationsFromUrl]);

  // find city on input value change
  useEffect(() => {
    const matchingCities = lookupCityAscii(value);
    const bestMatches = sortBestMatch(
      value,
      matchingCities.slice(0, 50),
      'city_ascii'
    );
    bestMatches.sort(({ target: a }, { target: b }) => {
      if (a['city'] < b['city']) {
        return -1;
      }
      if (a['city'] > b['city']) {
        return 1;
      }
      return 0;
    });
    setCities(bestMatches);
  }, [value]);

  // focus on input when drawer is open
  useEffect(() => {
    if (visibility && input.current) {
      input.current.focus();
    }
    if (!visibility && input.current) {
      input.current.blur();
    }
  }, [visibility]);

  const handleSelect = (target: ICityData) => {
    const { city_ascii: cityAscii, iso2, lat, lng } = target;
    const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
    if (AddLocation) {
      AddLocation(locationId);
    }
    setValue('');
    visibilityHandler();
  };
  const handleMatch = (item: ICityData): boolean => {
    const { city_ascii: cityAscii, iso2, lat, lng } = item;
    const guid = generateIdFormat(cityAscii, iso2, lat, lng);
    if (!urlLocations) {
      return false;
    }
    return urlLocations.has(guid);
  };

  return (
    <SwipeableDrawer
      classes={{ paper: css.sidebarPaper }}
      anchor="right"
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={visibility}
      onClose={visibilityHandler}
      onOpen={visibilityHandler}
      ModalProps={{ keepMounted: true }}
    >
      <Toolbar id={css.toolbar}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="button">{t('navbar.addNewCity')}</Typography>
          <IconButton
            aria-label="Close Drawer Button"
            onClick={visibilityHandler}
          >
            <Close />
          </IconButton>
        </Grid>
      </Toolbar>

      <div className={css.drawerBody}>
        <TextField
          onChange={(e: any) => setValue(e?.target?.value)}
          value={value}
          label={t('navbar.searchCities')}
          variant="outlined"
          className={css.textFieldSize}
          inputProps={{ 'data-testid': 'search-input' }}
        />
        <div className={css.drawerList}>
          <MenuList variant="selectedMenu" autoFocus>
            {cities.map(({ target }, index) => (
              <CustomItem
                key={index}
                target={target}
                added={handleMatch(target)}
                onSelect={handleSelect}
              />
            ))}
          </MenuList>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default AddCity;
