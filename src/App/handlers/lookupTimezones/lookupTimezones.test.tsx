import lookupTimezones from './lookupTimezones';

describe('lookup timezones function', () => {
  it('returns empty array if no or empty arguments given', () => {
    expect(lookupTimezones('')).toEqual([]);
  });
  it('should return correct values', () => {
    expect(lookupTimezones('Asia/Seoul')).not.toEqual([]);
    expect(lookupTimezones('Asia/Seoul')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          city_ascii: 'Seoul',
          city: 'Seoul',
          timezone: 'Asia/Seoul'
        })
      ])
    );
  });
  it('should return empty array if wrong timezone given', () => {
    expect(lookupTimezones('Asia/AnimeWorld')).toEqual([]);
  });
});
