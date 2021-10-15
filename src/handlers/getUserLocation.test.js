import getUserLocation from './getUserLocation';

describe('getting user geolocation function', () => {
    it('returns object with error message if user rejects to give geolocation', async () => {
        const res = await getUserLocation();
        expect(res).toEqual({ error: true, id: '', message: 'geolocation is not supported by this browser!' });
    });
});
