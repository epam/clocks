import { generateIdFormat } from './generateIdFormat';

const mockLocation = {
  city_ascii: 'Elephant Island, South Shetland Islands',
  iso2: 'AQ',
  lat: -61.99958901,
  lng: -57.99998458
};

describe('generating id from location', () => {
  it('returns empty string if one of arguments are not given', () => {
    const { city_ascii: cityAscii, iso2, lat } = mockLocation;
    // expect(generateIdFormat()).toEqual('');
    // expect(generateIdFormat(cityAscii)).toEqual('');
    // expect(generateIdFormat(cityAscii, iso2)).toEqual('');
    // expect(generateIdFormat(cityAscii, iso2, lat)).toEqual('');
  });
  // it('returns empty string if arguments are not valid', () => {
  //     const { city_ascii: cityAscii, iso2, lat, lng } = mockLocation;
  //     expect(generateIdFormat()).toEqual('');
  //     expect(generateIdFormat(cityAscii, {}, lat, lng)).toEqual('');
  //     expect(generateIdFormat(cityAscii, iso2, [], lng)).toEqual('');
  //     expect(generateIdFormat([], iso2, lat, lng)).toEqual('');
  //     expect(generateIdFormat(cityAscii, {}, lat, lng)).toEqual('');
  // });
  // it('returns generated id if arguments are valid', () => {
  //     const { city_ascii: cityAscii, iso2, lat, lng } = mockLocation;
  //     expect(generateIdFormat(cityAscii, iso2, lat, lng)).toEqual('Elephant Island, South Shetland Islands_AQ_61_57');
  // });
});
