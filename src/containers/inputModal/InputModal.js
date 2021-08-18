import React from 'react';
import { findFromCityStateProvince } from 'city-timezones';
import { Modal, Backdrop, Fade, IconButton, withStyles, InputBase, MenuList, MenuItem } from '@material-ui/core';
import { LocationsContext } from '../../context/locations';
import { sortBestMatch } from '../../helpers';
import { CrossIcon, Search } from '../../assets/icons/icons';
import css from './InputModal.module.scss';

const CustomInput = withStyles({
    root: {
        height: 48,
        width: '100%',
        borderRadius: 6,
        boxShadow: 'rgba(66, 153, 225, 0.5) 0px 0px 0px 3px',
        padding: '0 6px 0 12px',
        marginBottom: 16
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

const InputModal = ({ visibility, onClose }) => {
    const { actions } = React.useContext(LocationsContext);
    const [cities, setCities] = React.useState([]);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        const matchingCities = findFromCityStateProvince(value);
        const bestMatches = sortBestMatch(value, matchingCities.slice(0, 20));
        setCities(bestMatches);
    }, [value]);

    const handleSelect = target => {
        actions.AddLocation({
            city: target.city,
            country: target.country,
            timezone: target.timezone,
            message: ''
        });
        onClose();
    };

    return (
        <Modal
            className={css.modal}
            open={visibility}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
                classes: {
                    root: css.backdropColor
                }
            }}
        >
            <Fade in={visibility}>
                <div className={css.wrapper}>
                    <CustomInput
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

                    <div style={{ maxHeight: 480, overflowY: 'auto' }}>
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

                    <IconButton aria-label="close-button" id={css.exit} onClick={onClose}>
                        <CrossIcon />
                    </IconButton>
                </div>
            </Fade>
        </Modal>
    );
};
export default InputModal;
