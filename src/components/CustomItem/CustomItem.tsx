import { FC } from 'react';
import { MenuItem, withStyles, makeStyles } from '@material-ui/core';
import { CityData } from 'city-timezones';
import Badge from '@material-ui/core/Badge';
import { Colors, EpamColors } from '../../constants/colors';

const Item = withStyles({
    root: {
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 4,
        boxShadow: 'rgb(212, 217, 225) 0 1px 3px 0',
        margin: '10px 5px 0 5px'
    }
})(MenuItem);
const useStyle = makeStyles(() => ({
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
    mark: {
        color: EpamColors.black,
        fontWeight: 400
    },
    country: {
        fontSize: 14,
        fontWeight: 400,
        color: EpamColors.black
    },
    disabled: {
        backgroundColor: Colors.lightGray,
        pointerEvents: 'none'
    },
    badge: {
        display: 'block',
        '& span.MuiBadge-badge': {
            transform: 'translate(0, -50%)',
            padding: '1em',
            backgroundColor: EpamColors.blue
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

    const render = () => (
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
        <Badge className={css.badge} badgeContent="Added" color="primary">
            {render()}
        </Badge>
    ) : (
        render()
    );
};

export default CustomItem;
