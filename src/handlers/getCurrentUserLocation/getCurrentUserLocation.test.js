import { CURRENT_USER_LOCATION_ID } from '../../constants';
import getCurrentUserLocation from './getCurrentUserLocation';

describe('getting current user location function', () => {
  it('returns location id from local storage', async () => {
    localStorage.setItem(CURRENT_USER_LOCATION_ID, 'Namangan_UZ_41_71');
    const locationId = await getCurrentUserLocation();
    expect(locationId).toEqual('Namangan_UZ_41_71');
  });
  it('returns location id by timezone if local storage is empty', async () => {
    localStorage.removeItem(CURRENT_USER_LOCATION_ID);
    const locationId = await getCurrentUserLocation();
    expect(locationId).toEqual('Tashkent_UZ_41_69');
  });
});
