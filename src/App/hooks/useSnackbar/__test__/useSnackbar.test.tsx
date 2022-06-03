import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../../redux/reducer';
import { act } from 'react-dom/test-utils';
import useSnackbar from '../useSnackbar';
import { setSnackbar } from '../../../redux/actions';
import * as ReactRedux from 'react-redux';

const store = createStore(reducer);

describe('Usenackbar tests', () => {
  const useSelectorMock = jest.spyOn(ReactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });
  test('snackbarInfo should be called with some text argument and dispatch should be called with setSnackbar action', () => {
    let dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    let result: any;
    function DumbComponent() {
      result = useSnackbar();
      return null;
    }

    render(
      <Provider store={store}>
        <Router>
          <DumbComponent />
        </Router>
      </Provider>
    );

    act(() => {
      result.snackbarInfo('info snackbar');
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      setSnackbar({
        status: true,
        color: 'info',
        text: 'info snackbar'
      })
    );
  });

  test('closeSnackbar should be called and with setSnackbar action', () => {
    let dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    let result: any;
    function DumbComponent() {
      result = useSnackbar();
      return null;
    }

    render(
      <Provider store={store}>
        <Router>
          <DumbComponent />
        </Router>
      </Provider>
    );

    act(() => {
      result.closeSnackbar({
        status: false
      });
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(setSnackbar({ status: false }));
  });

  test('snackbarSuccess should be called and with setSnackbar action', () => {
    let dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    let result: any;
    function DumbComponent() {
      result = useSnackbar();
      return null;
    }

    render(
      <Provider store={store}>
        <Router>
          <DumbComponent />
        </Router>
      </Provider>
    );

    act(() => {
      result.snackbarSuccess('snackbar success');
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      setSnackbar({
        status: true,
        color: 'success',
        text: 'snackbar success'
      })
    );
  });

  test('snackbarError should be called with some text argument and dispatch should be called with setSnackbar action', () => {
    let dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
    let result: any;
    function DumbComponent() {
      result = useSnackbar();
      return null;
    }

    render(
      <Provider store={store}>
        <Router>
          <DumbComponent />
        </Router>
      </Provider>
    );

    act(() => {
      result.snackbarError('snackbar error');
    });

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      setSnackbar({
        status: true,
        color: 'error',
        text: 'snackbar error'
      })
    );
  });
});
