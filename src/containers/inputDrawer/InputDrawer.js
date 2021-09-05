import React from 'react';
import {
    Grid,
    SwipeableDrawer,
    Toolbar,
    Typography,
    IconButton,
    withStyles,
    InputBase,
    MenuList,
    MenuItem
} from '@material-ui/core';
import { CrossIcon, Search } from '../../assets/icons/icons';
import css from './InputDrawer.module.scss';
import { lookupCityAscii, sortBestMatch } from '../../helpers';
import { LocationsContext } from '../../context/locations';

const CustomInput = withStyles({
    root: {
        height: 48,
        width: '100%',
        borderRadius: 6,
        boxShadow: 'rgba(66, 153, 225, 0.5) 0px 0px 0px 3px',
        padding: '0 6px 0 12px'
    },
    input: {
        paddingLeft: 8,
        height: '-webkit-fill-available',
        fontSize: 20
    }
})(InputBase);
const CustomItem = withStyles({
    root: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 4,
        boxShadow: 'rgb(212, 217, 225) 0 1px 3px 0',
        margin: '10px 5px 0 5px'
    }
})(MenuItem);

const InputDrawer = ({ visibility, setVisibility }) => {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const input = React.useRef(null);
    const { actions } = React.useContext(LocationsContext);
    const [value, setValue] = React.useState('');
    const [cities, setCities] = React.useState([]);

    React.useEffect(() => {
        const matchingCities = lookupCityAscii(value);
        const bestMatches = sortBestMatch(value, matchingCities.slice(0, 20));
        setCities(bestMatches);
    }, [value]);

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

    React.useEffect(() => {
        if (visibility === true && input.current) {
            input.current.focus();
        }
    }, [visibility]);

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
            <div>
                <Toolbar id={css.toolbar}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Typography variant="button">Add New City</Typography>
                        <IconButton id={css.closeButton} onClick={() => setVisibility(false)}>
                            <CrossIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
                <div className={css.drawerBody}>
                    <CustomInput
                        inputRef={input}
                        onChange={e => setValue(e?.target?.value)}
                        value={value}
                        text="text"
                        placeholder="Search cities"
                        startAdornment={<Search />}
                        endAdornment={
                            <IconButton onClick={() => setValue('')}>
                                <CrossIcon />
                            </IconButton>
                        }
                    />
                    <div style={{ overflowY: 'auto' }}>
                        <MenuList>
                            {cities.map(({ target }, index) => (
                                <CustomItem key={index} onClick={() => handleSelect(target)}>
                                    <div className={css.text}>
                                        <span className={css.city}>{target.city}</span>
                                        <span className={css.country}>
                                            {target.country}, {target.province}
                                        </span>
                                    </div>
                                </CustomItem>
                            ))}
                        </MenuList>
                    </div>
                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default InputDrawer;
