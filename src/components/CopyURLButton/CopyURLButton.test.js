import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CopyURLButton from './CopyURLButton';
import { SnackbarContext } from '../../context/snackbar';

const MockComponent = ({ OpenSnackbar }) => {
  const store = { actions: { OpenSnackbar } };

  return (
    <SnackbarContext.Provider value={store}>
      <CopyURLButton />
    </SnackbarContext.Provider>
  );
};

describe('Snackbar Component: ', () => {
  const OpenSnackbarMock = jest.fn();

  it('Renders properly', () => {
    render(<MockComponent OpenSnackbar={OpenSnackbarMock} />);
    expect(
      screen.getByLabelText('copy to clipboard button')
    ).toBeInTheDocument();
    expect(screen.getByText(/Copy/i)).toBeInTheDocument();
    expect(screen.getByTestId('ContentCopyIcon')).toBeInTheDocument();
    expect(
      screen.getByLabelText('copy to clipboard button')
    ).not.toHaveAttribute('disabled');
  });

  it('On click adds url to clipboard', () => {
    render(<MockComponent OpenSnackbar={OpenSnackbarMock} />);
    const button = screen.getByLabelText('copy to clipboard button');
    userEvent.click(button);
    expect(OpenSnackbarMock).toHaveBeenCalled();
    expect(OpenSnackbarMock).toHaveBeenCalledTimes(1);
  });
});
