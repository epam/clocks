import moment from 'moment-timezone';
import { TTimezone } from '../types/location';

const getGmtOffset = (timezone: TTimezone) => {
    const offset = moment.tz(moment.utc(), timezone).utcOffset();
    if (offset > 0) {
        return `+${offset / 60}`;
    }
    return offset / 60;
};

export default getGmtOffset;
