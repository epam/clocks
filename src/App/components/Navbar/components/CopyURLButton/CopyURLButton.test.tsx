import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import CopyURLButton from './CopyURLButton';
import rootReducer from '../../../../redux/rootReducer';
import i18n from '../../../../dictionary';
import {
  snackbarActions,
  snackbarReducer
} from '../../../../redux/snackbarRedux/snackbarSlice';

const state = createStore(rootReducer);
const { snackbarHandler } = snackbarActions;

const reduxInitialState = {
  visibility: false,
  message: '',
  type: 'success'
};

const ReduxProvider = ({ children }) => (
  <Provider store={state}>{children}</Provider>
);

// const MockComponent = () => (
//   <ReduxProvider>
//     <I18nextProvider i18n={i18n}>
//       <CopyURLButton />
//     </I18nextProvider>
//   </ReduxProvider>
// );

describe('Snackbar Component on desktop: ', () => {
  test('mock test', () => {});
  // it('Renders properly', () => {
  //   render(<MockComponent />);
  //   expect(
  //     screen.getByLabelText('desktop copy to clipboard button')
  //   ).toBeInTheDocument();
  //   expect(screen.getByText(/Copy/i)).toBeInTheDocument();
  //   expect(
  //     screen.getByLabelText('desktop copy to clipboard button')
  //   ).not.toHaveAttribute('disabled');
  // });
  //
  // it('On click adds url to clipboard', () => {
  //   render(<MockComponent />);
  //   const button = screen.getByLabelText('desktop copy to clipboard button');
  //   expect(snackbarReducer(undefined, reduxInitialState)).toEqual(
  //     reduxInitialState
  //   );
  //   userEvent.click(button);
  //   expect(
  //     snackbarReducer(
  //       undefined,
  //       snackbar({ visibility: true, message: 'success' })
  //     )
  //   ).toEqual({
  //     visibility: true,
  //     message: 'success',
  //     type: 'success'
  //   });
  // });
});
