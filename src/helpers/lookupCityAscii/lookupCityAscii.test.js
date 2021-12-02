import lookupCityAscii from './lookupCityAscii';

describe('lookup city ascii function', () => {
    it('returns empty array if no or empty string given', () => {
        expect(lookupCityAscii()).toEqual([]);
        expect(lookupCityAscii('')).toEqual([]);
    });
    it('should return empty array if wrong city name is given', () => {
        expect(lookupCityAscii('hello world')).toEqual([]);
    });
    it('should return correct values', () => {
        expect(lookupCityAscii('tashkent')).not.toEqual([]);
        expect(lookupCityAscii('tashkent')).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    city_ascii: 'Tashkent',
                    city: 'Tashkent',
                    timezone: 'Asia/Tashkent'
                })
            ])
        );
    });
    it('should return some value even if city name not fully given', () => {
        expect(lookupCityAscii('tash')).not.toEqual([]);
        expect(lookupCityAscii('tash')).toEqual(
            expect.arrayContaining([
                expect.objectContaining({}),
                expect.objectContaining({
                    city_ascii: 'Tashkent',
                    city: 'Tashkent',
                    timezone: 'Asia/Tashkent'
                })
            ])
        );
    });
});
