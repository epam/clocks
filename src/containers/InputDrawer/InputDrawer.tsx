import { FC, useContext, useRef, useMemo, useState, useEffect } from 'react';
import { Grid, SwipeableDrawer, Toolbar, Typography, IconButton, MenuList } from '@material-ui/core';
import { CrossIcon } from '../../assets/icons/icons';
import css from './InputDrawer.module.scss';
import { lookupCityAscii, sortBestMatch } from '../../helpers';
import { LocationsContext } from '../../context/locations';
import CustomInput from '../../components/CustomInput';
import CustomItem from '../../components/CustomItem';
import { generateIdFormat } from '../../handlers';
import { ILocation, IMatchingLocation } from '../../types/location';

interface IProps {
    visibility: boolean;
    setVisibility: (isVisible?: boolean) => void;
}

const InputDrawer: FC<IProps> = ({ visibility, setVisibility }) => {
    // @ts-ignore
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const {
        actions: { GetLocationsFromUrl, AddLocation }
    } = useContext(LocationsContext);

    const [cities, setCities] = useState<IMatchingLocation[]>([]);
    const [value, setValue] = useState<string>('');
    const input = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const urlLocations = useMemo(() => {
        if (GetLocationsFromUrl) {
            return new Set(GetLocationsFromUrl());
        }
    }, [GetLocationsFromUrl]);

    // find city on input value change
    useEffect(() => {
        const matchingCities = lookupCityAscii(value);
        const bestMatches = sortBestMatch(value, matchingCities.slice(0, 50), 'city_ascii');
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
        if (visibility === true && input.current) {
            input.current.focus();
        }
        if (visibility === false && input.current) {
            input.current.blur();
        }
    }, [visibility]);

    const handleSelect = (target: ILocation) => {
        const { city_ascii: cityAscii, iso2, lat, lng } = target;
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        if (AddLocation) {
            AddLocation(locationId);
        }
        setValue('');
        setVisibility(false);
    };
    const handleMatch = (item: ILocation): boolean => {
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
            onClose={() => setVisibility(false)}
            onOpen={() => setVisibility(true)}
            ModalProps={{ keepMounted: true }}
        >
            <Toolbar id={css.toolbar}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Typography variant="button">Add New City</Typography>
                    <IconButton id={css.closeButton} onClick={() => setVisibility(false)}>
                        <CrossIcon />
                    </IconButton>
                </Grid>
            </Toolbar>

            <div className={css.drawerBody}>
                <CustomInput ref={input} value={value} setValue={value => setValue(value)} />
                <div className={css.drawerList}>
                    <MenuList variant="selectedMenu" autoFocus ref={listRef}>
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

export default InputDrawer;
