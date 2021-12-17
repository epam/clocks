import { renderHook } from '@testing-library/react-hooks';

import { PARAM_KEYWORD } from '../../lib/constants';
import { useQueryParams } from './useQueryParams';

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

describe('test cases for useQueryParams hook', () => {
  it('sets locations to the url params', () => {
    const {
      result: { current }
    } = renderHook(useQueryParams);
    current.SetParam(PARAM_KEYWORD, ['Tashkent_UZ_41_69', 'Namangan_UZ_41_71']);
  });
  it('gets locations from the url params', () => {
    const {
      result: { current }
    } = renderHook(useQueryParams);
    const locations = current.GetParam(PARAM_KEYWORD);
    expect(locations).toEqual(['Tashkent_UZ_41_69', 'Namangan_UZ_41_71']);
  });
  it('returns null if param is absent in the url params', () => {
    const {
      result: { current }
    } = renderHook(useQueryParams);
    const locations = current.GetParam('absent');
    expect(locations).toEqual(null);
  });
});
