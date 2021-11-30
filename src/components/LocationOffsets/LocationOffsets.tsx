import { FC } from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    host: {
        padding: '2px 8px',
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        textAlign: 'center',
        borderRadius: 20,
        marginBottom: 8
    },
    text: {
        color: theme.palette.grey[300],
        height: 32,
        textAlign: 'center'
    }
}));

interface IProps {
    hours: number;
    minutes: number;
    host: boolean;
}

const LocationOffsets: FC<IProps> = ({ hours, minutes, host }) => {
    const css = useStyle();

    const strHour = hours !== 0 ? `${Math.abs(hours)} ${Math.abs(hours) <= 1 ? ' HOUR ' : ' HOURS '}` : '';
    const strMinute = minutes !== 0 ? `${Math.abs(minutes)} ${Math.abs(minutes) <= 1 ? ' MINUTE ' : ' MINUTES '}` : '';

    if (host) {
        return (
            <Typography variant="subtitle2" className={css.host}>
                You are here
            </Typography>
        );
    }

    return (
        <Typography variant="subtitle2" className={css.text}>
            {hours < 0 && <>&ndash;</>}
            {strHour}
            {strMinute}
        </Typography>
    );
};

export default LocationOffsets;
