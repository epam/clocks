import React from 'react';
import { Grid, SwipeableDrawer, Toolbar, Typography, IconButton, MenuList } from '@material-ui/core';
import { CrossIcon } from '../../assets/icons/icons';
import css from './InputDrawer.module.scss';
import { lookupCityAscii, sortBestMatch } from '../../helpers';
import { LocationsContext } from '../../context/locations';
import CustomInput from '../../components/customInput';
import CustomItem from '../../components/cutomItem';

const InputDrawer = ({ visibility, setVisibility }) => {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const { actions } = React.useContext(LocationsContext);
    const input = React.useRef(null);
    const urlLocations = React.useMemo(() => {
        return new Set(actions?.GetLocationsFromUrl());
    }, [actions]);

    const [value, setValue] = React.useState('');
    const [cities, setCities] = React.useState([]);

    // find city on input value change
    React.useEffect(() => {
        const matchingCities = lookupCityAscii(value);
        const bestMatches = sortBestMatch(value, matchingCities.slice(0, 50));
        setCities(bestMatches);
    }, [value]);
    // focus on input when drawer is open
    React.useEffect(() => {
        if (visibility === true && input.current) {
            input.current.focus();
        }
        if (visibility === false && input.current) {
            input.current.blur();
        }
    }, [visibility]);

    const handleSelect = target => {
        actions.AddLocation({
            cityAscii: target.city_ascii,
            iso2: target.iso2,
            lat: target.lat,
            lng: target.lng,
            message: ''
        });
        setValue('');
        setVisibility(false);
    };
    const handleMatch = item => {
        const guid = [item.city_ascii, item.iso2, Math.floor(Math.abs(item.lat)), Math.floor(Math.abs(item.lng))].join(
            '_'
        );
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
                    <MenuList>
                        {cities.map(({ target }, index) => (
                            <CustomItem
                                key={index}
                                target={target}
                                added={handleMatch(target)}
                                onSelect={() => handleSelect(target)}
                            />
                        ))}
                    </MenuList>
                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default InputDrawer;
