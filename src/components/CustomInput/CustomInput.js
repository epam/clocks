import React from 'react';
import { IconButton, InputBase, withStyles } from '@material-ui/core';
import { CrossIcon, Search } from '../../assets/icons/icons';

const Input = withStyles({
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

const CustomInput = React.forwardRef(({ value, setValue }, ref) => {
    return (
        <Input
            inputRef={ref}
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
    );
});

export default CustomInput;
