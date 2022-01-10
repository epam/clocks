import { ILocationsInitialState } from './locations.interface';

export const INITIAL_STATE: ILocationsInitialState = {
  locations: [
    {
      city: 'Namangan',
      country: 'Uzbekistan',
      hasCountry: true,
      hasDate: true,
      hasTimezone: true,
      host: true,
      id: 'Namangan_UZ_41_71',
      message: '',
      offset: { hours: 0, minutes: 0 },
      timezone: 'Asia/Tashkent'
    },
    {
      city: 'Tashkent',
      country: 'Uzbekistan',
      hasCountry: true,
      hasDate: true,
      hasTimezone: true,
      host: false,
      id: 'Tashkent_UZ_41_69',
      message: '',
      offset: { hours: 0, minutes: 0 },
      timezone: 'Asia/Tashkent'
    }
  ]
};

export const PARAM_KEYWORD = 'locations';
export const CURRENT_USER_LOCATION_ID = 'CURRENT_USER_LOCATION_ID';
