import { renderHook } from '@testing-library/react-hooks';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getCurrentUserLocation } from '../../handlers';
import { PARAM_KEYWORD } from '../../lib/constants';
import { useUrl } from './useUrl';
import rootReducer from '../../redux/rootReducer';

const MockSetParam = jest.fn();
const MockGetParam = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({
    pathname: '/',
    search:
      '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D',
    hash: ''
  }),
  useHistory: () => ({
    push: jest.fn()
  })
}));

jest.mock('../useQueryParams', () => {
  const originalModule = jest.requireActual('../useQueryParams');
  return {
    __esModule: true,
    ...originalModule,
    useQueryParams: () => ({ SetParam: MockSetParam, GetParam: MockGetParam })
  };
});

const state = createStore(rootReducer);

const wrapper = ({ children }) => <Provider store={state}>{children}</Provider>;

describe('test cases for useUrl hook', () => {
  it('add location to url params', () => {
    const {
      result: { current }
    } = renderHook(() => useUrl(), { wrapper });
    current.AddLocation('Andijon_UZ_40_72');
    expect(MockGetParam).toHaveBeenCalledTimes(1);
    expect(MockSetParam).toHaveBeenCalledTimes(1);
  });
  it('delete location from url params', () => {
    const {
      result: { current }
    } = renderHook(() => useUrl(), { wrapper });
    current.DeleteLocation('Tashkent_UZ_41_69');
    expect(MockGetParam).toHaveBeenCalledTimes(1);
    expect(MockSetParam).toHaveBeenCalledTimes(1);
  });
  it('reset url for current user', async () => {
    const {
      result: { current }
    } = renderHook(() => useUrl(), { wrapper });
    await current.ResetUrl();
    const locationId = await getCurrentUserLocation();
    expect(MockSetParam).toHaveBeenCalledTimes(1);
    expect(MockSetParam).toBeCalledWith(PARAM_KEYWORD, [locationId]);
  });
  it('return location ids from url params', () => {
    const {
      result: { current }
    } = renderHook(() => useUrl(), { wrapper });
    current.GetLocationsFromUrl();
    expect(MockGetParam).toHaveBeenCalledTimes(1);
    expect(MockGetParam).toHaveBeenCalledWith(PARAM_KEYWORD);
  });
});
