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
        height: 32
    }
});

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
