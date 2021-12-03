import { renderHook } from '@testing-library/react-hooks';
import { CURRENT_USER_LOCATION_ID } from '../../constants';
import { useLocalStorage } from './useLocalStorage';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('test cases for useLocalStorage hook', () => {
  it('calls localStorage getItem', () => {
    const {
      result: { current }
    } = renderHook(useLocalStorage);
    current.getItem(CURRENT_USER_LOCATION_ID);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });
  it('calls localStorage setItem', () => {
    const {
      result: { current }
    } = renderHook(useLocalStorage);
    current.setItem(CURRENT_USER_LOCATION_ID);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('calls localStorage removeItem', () => {
    const {
      result: { current }
    } = renderHook(useLocalStorage);
    current.removeItem(CURRENT_USER_LOCATION_ID);
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });
  it('calls localStorage clear', () => {
    const {
      result: { current }
    } = renderHook(useLocalStorage);
    current.clear();
    expect(localStorage.clear).toHaveBeenCalledTimes(1);
  });
});
