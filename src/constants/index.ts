import { EpamColors } from './colors';
import { editorConfig } from './ckeditorConfig';
import { InitialContext } from './initialContext';
import { CLOCKS_FONTS } from './fonts';
import cityMapping from './city-timezones.json';

const PARAM_KEYWORD = 'locations';
const DASHBOARD_PARAM_KEYWORD = 'name';
const CURRENT_USER_LOCATION_ID = 'CURRENT_USER_LOCATION_ID';
const HAS_COUNTRY = 'HAS_COUNTRY';
const HAS_DATE = 'HAS_DATE';
const HAS_TIMEZONE = 'HAS_TIMEZONE';
const CLOCKS_FONT = 'CLOCKS_FONT';

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
  CLOCKS_FONTS,
  editorConfig,
  cityMapping
};
