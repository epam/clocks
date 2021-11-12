import { FC } from 'react';
import { MenuItem, withStyles, makeStyles } from '@material-ui/core';
import { CityData } from 'city-timezones';
import Badge from '@material-ui/core/Badge';

const Item = withStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        padding: 8,
        borderRadius: 4,
        boxShadow: theme.palette.type === 'light' ? 'rgb(212, 217, 225) 0 1px 3px 0' : 'rgb(34, 34, 34) 0 1px 3px 0',
        margin: '10px 5px 0 5px'
    }
}))(MenuItem);

const useStyle = makeStyles(theme => ({
    text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    city: {
        fontSize: 16,
        fontWeight: 600
    },
    country: {
        fontSize: 14,
        fontWeight: 400,
        color: theme.palette.text.primary
    },
    disabled: {
        backgroundColor: theme.palette.type === 'light' ? '#dcdcda' : '#000',
        pointerEvents: 'none'
    },
    badge: {
        display: 'block',
        '& span.MuiBadge-badge': {
            transform: 'translate(0, -50%)',
            padding: '1em',
            backgroundColor: theme.palette.primary.main,
            color: 'white'
        }
    }
}));

interface IProps {
    target: CityData;
    onSelect: (target: CityData) => void;
    added: boolean;
}
const CustomItem: FC<IProps> = ({ target, onSelect, added = false }) => {
    const css = useStyle();

    const Render = () => (
        <Item onClick={() => onSelect(target)} className={added ? css.disabled : ''}>
            <div className={css.text}>
                <div className={css.title}>
                    <span className={css.city}>{target.city}</span>
                </div>
                <span className={css.country}>
                    {target.country}
                    {target.province ? `, ${target.province}` : ''}
                </span>
            </div>
        </Item>
    );

    return added ? (
        <Badge data-testid="Badge" className={css.badge} badgeContent="Added" color="primary">
            <Render />
        </Badge>
    ) : (
        <Render />
    );
};

export default CustomItem;
