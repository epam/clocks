import sortBestMatch from './sortByBestMatching';
import lookupTimezones from './lookupTimezones';

// get sample array of object
const data = lookupTimezones('Asia/Seoul');
const array = ['Seoul', 'Tokyo', 'Tashkent', 'Minsk'];

describe('Sort by best match function', () => {
    it('should return empty array of no / wrong arguments given', () => {
        expect(sortBestMatch()).toEqual([]);
        expect(sortBestMatch(1235, [])).toEqual([]);
        expect(sortBestMatch('', [], '')).toEqual([]);
        expect(sortBestMatch('seoul', data)).toEqual([]);
    });
    it('should return expected value', () => {
        expect(sortBestMatch('seoul', array)).toEqual(
            expect.arrayContaining([expect.objectContaining({ target: expect.anything(), rating: expect.any(Number) })])
        );
        expect(sortBestMatch('seoul', data, ['city_ascii'])).toEqual(
            expect.arrayContaining([expect.objectContaining({ target: expect.anything(), rating: expect.any(Number) })])
        );
        expect(sortBestMatch('seoul', data, ['city_ascii'])[0].target).toEqual(
            expect.objectContaining({ city_ascii: 'Seoul', timezone: 'Asia/Seoul' })
        );
        expect(sortBestMatch('seoul', array)[0].target).toBe('Seoul');
    });
});
