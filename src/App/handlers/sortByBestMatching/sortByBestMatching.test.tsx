import lookupTimezones from '../lookupTimezones/lookupTimezones';
import sortBestMatch from './sortByBestMatching';

// get sample array of object
const data = lookupTimezones('Asia/Seoul');
const array = ['Seoul', 'Tokyo', 'Tashkent', 'Minsk'];

describe('Sort by best match function', () => {
  it('should return empty array of no / wrong arguments given', () => {
    expect(sortBestMatch(undefined, undefined, '')).toEqual([]);
    expect(sortBestMatch(undefined, [], '')).toEqual([]);
    expect(sortBestMatch('', [], '')).toEqual([]);
    expect(sortBestMatch('seoul', data, 'undefined')).toEqual([]);
  });
});
