import generateIdFormat from './generateIdFormat';

const mockLocation = {
  city_ascii: 'Elephant Island, South Shetland Islands',
  iso2: 'AQ',
  lat: -61.99958901,
  lng: -57.99998458
};

describe('generating id from location', () => {
  it('returns generated id if arguments are valid', () => {
    const { city_ascii: cityAscii, iso2, lat, lng } = mockLocation;
    expect(generateIdFormat(cityAscii, iso2, lat, lng)).toEqual(
      'Elephant Island, South Shetland Islands_AQ_61_57'
    );
  });
});
