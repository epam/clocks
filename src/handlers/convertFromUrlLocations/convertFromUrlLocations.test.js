import convertFromUrlLocations from './convertFromUrlLocations';

const mockIdList = ['Tashkent_UZ_41_69__this is message', 'Namangan_UZ_41_71', 'Binghamton_US_42_75'];
const mockIdListRes = [
    { id: 'Tashkent_UZ_41_69', message: 'this is message' },
    { id: 'Namangan_UZ_41_71', message: '' },
    { id: 'Binghamton_US_42_75', message: '' }
];

describe('convert to object list from url string function', () => {
    it('returns empty array if arguments are not valid', () => {
        expect(convertFromUrlLocations()).toEqual([]);
        expect(convertFromUrlLocations('')).toEqual([]);
        expect(convertFromUrlLocations({})).toEqual([]);
    });
    it('returns converted list if arguments are valid', () => {
        expect(convertFromUrlLocations([])).toEqual([]);
        expect(convertFromUrlLocations(mockIdList)).toEqual(mockIdListRes);
    });
});
