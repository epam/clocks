import { renderHook } from '@testing-library/react-hooks';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { useUrl } from './useUrl';
import rootReducer from '../../redux/rootReducer';

const MockFunction = jest.fn();
const MockOpenSnackbar = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useLocation: () => ({
      pathname: '/',
      search:
        '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D',
      hash: ''
    }),
    useHistory: () => ({
      push: MockFunction
    })
  };
});

const state = createStore(rootReducer);

const wrapper = ({ children }) => <Provider store={state}>{children}</Provider>;

describe('testing useUrl hook without mocks', () => {
  it('add comment to url params', () => {
    const expectedURI =
      '?locations=WyJUYXNoa2VudF9VWl80MV82OV9fdGhpcyBpcyB0ZXN0IGNvbW1lbnQiLCJOYW1hbmdhbl9VWl80MV83MSJd';
    const {
      result: { current }
    } = renderHook(() => useUrl(), { wrapper });
    current.AddComment('Tashkent_UZ_41_69', 'this is test comment');
    expect(MockFunction).toHaveBeenCalledTimes(1);
    expect(MockFunction).toHaveBeenCalledWith(expectedURI);
  });
  it('show notification snackbar if city has already been added', () => {
    const {
      result: { current }
    } = renderHook(() => useUrl(), { wrapper });
    current.AddLocation('Tashkent_UZ_41_69');
    expect(MockOpenSnackbar).toHaveBeenCalledTimes(0);
  });
  it('return location ids from url params', () => {
    const expectedLocationIds = ['Tashkent_UZ_41_69', 'Namangan_UZ_41_71'];
    const {
      result: { current }
    } = renderHook(() => useUrl(), { wrapper });
    const locationIdsFromUrl = current.GetLocationsFromUrl();
    expect(locationIdsFromUrl).toEqual(expectedLocationIds);
  });
});
