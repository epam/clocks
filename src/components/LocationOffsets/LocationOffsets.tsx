import { FC } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { EpamColors } from '../../constants';
import { Colors } from '../../constants/colors';

const useStyle = makeStyles({
    host: {
        padding: '2px 8px',
        color: 'white',
        backgroundColor: EpamColors.blue,
        borderRadius: 20,
        marginBottom: 8
    },
    text: {
        color: Colors.gray,
        marginBottom: 10
    },
    empty: {
        marginBottom: 32
    }
});

interface IProps {
    hours: number;
    minutes: number;
    host: boolean;
}

const LocationOffsets: FC<IProps> = ({ hours, minutes, host }) => {
    const hourDif = Math.abs(hours);
    const minuteDif = Math.abs(minutes);
    const css = useStyle();

    if (host) {
        return (
            <Typography variant="subtitle2" className={css.host}>
                You are here
            </Typography>
        );
    }

    if (hourDif === 0 && minuteDif === 0) return <span className={css.empty} />;

    if (hours < 0) {
        return (
            <Typography variant="subtitle2" className={css.text}>
                &ndash;
                {hourDif}
                {hourDif <= 1 ? ' HOUR ' : ' HOURS '}
                {minuteDif !== 0 && `${minuteDif} ${minuteDif <= 1 ? ' MINUTE' : ' MINUTES'}`}
            </Typography>
        );
    }
    return (
        <Typography variant="subtitle2" className={css.text}>
            {hourDif !== 0 && `+${hourDif} ${hourDif <= 1 ? ' HOUR ' : ' HOURS '}`}
            {minuteDif !== 0 && `${minuteDif} ${minuteDif <= 1 ? ' MINUTE' : ' MINUTES'}`}
        </Typography>
    );
};

export default LocationOffsets;
