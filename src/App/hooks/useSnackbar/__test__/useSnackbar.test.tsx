import React from 'react';
import useSnackbar from '../useSnackbar';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../../redux/reducer';

const store = createStore(reducer);

describe('Use snack bar testing', () => {
  const {
    result: { current }
  } = renderHook(useSnackbar, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
  });

  it('snackbarSuccess works OK', () => {
    act(() => {
      current.snackbarSuccess('success text');
    });
    expect(store.getState().snackbar.text).toBe('success text');
    expect(store.getState().snackbar.color).toBe('success');
    expect(store.getState().snackbar.status).toBeTruthy();
  });

  it('snackbarInfo works OK', () => {
    act(() => {
      current.snackbarInfo('info text');
    });
    expect(store.getState().snackbar.text).toBe('info text');
    expect(store.getState().snackbar.color).toBe('info');
    expect(store.getState().snackbar.status).toBeTruthy();
  });

  it('snackbarError works OK', () => {
    act(() => {
      current.snackbarError('error text');
    });
    expect(store.getState().snackbar.text).toBe('error text');
    expect(store.getState().snackbar.color).toBe('error');
    expect(store.getState().snackbar.status).toBeTruthy();
  });

  it('closeSnackbar works OK', () => {
    act(() => {
      current.closeSnackbar();
    });
    expect(store.getState().snackbar.status).toBe(false);
  });
});
