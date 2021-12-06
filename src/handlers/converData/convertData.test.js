import convertData from './convertData';

const mockDataList = [
  { id: 'Tashkent_UZ_41_69', message: '' },
  { id: 'Namangan_UZ_41_71', message: '' },
  { id: 'Binghamton_US_42_75', message: '' }
];

const mockDataListResult = [
  {
    city: 'Binghamton',
    country: 'United States of America',
    host: false,
    id: 'Binghamton_US_42_75',
    message: '',
    offset: { hours: -10, minutes: 0 },
    timezone: 'America/New_York',
    hasCountry: true,
    hasDate: true,
    hasTimezone: true
  },
  {
    city: 'Tashkent',
    country: 'Uzbekistan',
    host: true,
    id: 'Tashkent_UZ_41_69',
    message: '',
    offset: { hours: 0, minutes: 0 },
    timezone: 'Asia/Tashkent',
    hasCountry: true,
    hasDate: true,
    hasTimezone: true
  },
  {
    city: 'Namangan',
    country: 'Uzbekistan',
    host: false,
    id: 'Namangan_UZ_41_71',
    message: '',
    offset: { hours: 0, minutes: 0 },
    timezone: 'Asia/Tashkent',
    hasCountry: true,
    hasDate: true,
    hasTimezone: true
  }
];

const mockDataListResultWithoutHost = [
  {
    city: 'Tashkent',
    country: 'Uzbekistan',
    host: false,
    id: 'Tashkent_UZ_41_69',
    message: '',
    offset: { hours: 0, minutes: 0 },
    timezone: 'Asia/Tashkent',
    hasCountry: true,
    hasDate: true,
    hasTimezone: true
  },
  {
    city: 'Namangan',
    country: 'Uzbekistan',
    host: false,
    id: 'Namangan_UZ_41_71',
    message: '',
    offset: { hours: 0, minutes: 0 },
    timezone: 'Asia/Tashkent',
    hasCountry: true,
    hasDate: true,
    hasTimezone: true
  },
  {
    city: 'Binghamton',
    country: 'United States of America',
    host: false,
    id: 'Binghamton_US_42_75',
    message: '',
    offset: { hours: 0, minutes: 0 },
    timezone: 'America/New_York',
    hasCountry: true,
    hasDate: true,
    hasTimezone: true
  }
];

describe('convert url locations data function', () => {
  it('returns empty array if arguments are not given or empty', () => {
    expect(convertData()).toEqual([]);
    expect(convertData('')).toEqual([]);
    expect(convertData({})).toEqual([]);
    expect(convertData([], '')).toEqual([]);
    expect(convertData([], {})).toEqual([]);
  });

  it('returns converted data without host if host id is not given or not valid', () => {
    expect(convertData(mockDataList)).toEqual(mockDataListResultWithoutHost);
    expect(convertData(mockDataList, {})).toEqual(
      mockDataListResultWithoutHost
    );
    expect(convertData(mockDataList, [])).toEqual(
      mockDataListResultWithoutHost
    );
  });

  it('returns widget locations list for valid arguments', () => {
    expect(convertData(mockDataList, 'Tashkent_UZ_41_69')).toEqual(
      mockDataListResult
    );
  });
});
