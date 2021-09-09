import React from 'react';
import { IconButton, MenuItem, MenuList } from '@material-ui/core';
import { CrossIcon } from '../../assets/icons/icons';
import css from './LocationDropdown.module.scss';

const LocationDropdown = ({ visibility = false, setVisibility, deleteCity, isHost = false }) => {
    return (
        <div className={`${css.backdrop} ${visibility && css.visible}`}>
            <div className={`${css.drawer} ${visibility && css.drawerVisible}`}>
                <div className={css.closeDrawerIcon}>
                    <IconButton onClick={() => setVisibility(false)}>
                        <CrossIcon />
                    </IconButton>
                </div>
                <MenuList className={css.drawerBody}>
                    <MenuItem> Add Comment </MenuItem>
                    {!isHost && <MenuItem onClick={deleteCity}> Delete </MenuItem>}
                </MenuList>
            </div>
        </div>
    );
};

export default LocationDropdown;
