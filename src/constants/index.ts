import { EpamColors } from './colors';
import { InitialContext } from './initialContext';

const PARAM_KEYWORD = 'locations';
const DASHBOARD_PARAM_KEYWORD = 'name';
const CURRENT_USER_LOCATION_ID = 'CURRENT_USER_LOCATION_ID';
const HAS_COUNTRY = 'HAS_COUNTRY';
const HAS_DATE = 'HAS_DATE';
const HAS_TIMEZONE = 'HAS_TIMEZONE';
const CLOCKS_FONT = 'CLOCKS_FONT';

interface IClocksFont {
    value: string;
    label: string;
}

const CLOCKS_FONTS: { [fontName: string]: IClocksFont } = {
    ROBOTO: {
        value: 'roboto',
        label: 'Roboto'
    },
    ROBOTO_MONO: {
        value: 'roboto-mono',
        label: 'Roboto Mono'
    },
    PRESS_START: {
        value: 'press-start',
        label: 'Press Start'
    },
    ORBITRON: {
        value: 'orbitron',
        label: 'Orbitron'
    },
    QAHIRI: {
        value: 'qahiri',
        label: 'Qahiri'
    },
    OPEN_SANS: {
        value: 'open-sans',
        label: 'Open Sans'
    },
    ESTONIA: {
        value: 'estonia',
        label: 'Estonia'
    }
};

export {
    PARAM_KEYWORD,
    HAS_COUNTRY,
    HAS_DATE,
    EpamColors,
    CURRENT_USER_LOCATION_ID,
    InitialContext,
    DASHBOARD_PARAM_KEYWORD,
    HAS_TIMEZONE,
    CLOCKS_FONT,
    CLOCKS_FONTS
};
