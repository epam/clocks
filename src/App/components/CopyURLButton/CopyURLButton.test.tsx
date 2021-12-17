import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CopyURLButton from './CopyURLButton';
import { SnackbarContext } from '../../context/snackbar';
import { ScreenSizesContext } from '../../context/screenSizes';

const MockComponent = ({ OpenSnackbar, width = 1980 }) => {
  const store = { actions: { OpenSnackbar }, state: {} };
  const size = { state: { width }, actions: {} };

  return (
    <SnackbarContext.Provider value={store}>
      <ScreenSizesContext.Provider value={size}>
        <CopyURLButton />
      </ScreenSizesContext.Provider>
    </SnackbarContext.Provider>
  );
};

describe('Snackbar Component on desktop: ', () => {
  const OpenSnackbarMock = jest.fn();

  it('Renders properly', () => {
    render(<MockComponent OpenSnackbar={OpenSnackbarMock} />);
    expect(
      screen.getByLabelText('desktop copy to clipboard button')
    ).toBeInTheDocument();
    expect(screen.getByText(/Copy/i)).toBeInTheDocument();
    expect(screen.getByTestId('ContentCopyIcon')).toBeInTheDocument();
    expect(
      screen.getByLabelText('desktop copy to clipboard button')
    ).not.toHaveAttribute('disabled');
  });

  it('On click adds url to clipboard', () => {
    render(<MockComponent OpenSnackbar={OpenSnackbarMock} />);
    const button = screen.getByLabelText('desktop copy to clipboard button');
    userEvent.click(button);
    expect(OpenSnackbarMock).toHaveBeenCalled();
    expect(OpenSnackbarMock).toHaveBeenCalledTimes(1);
  });
});

describe('Snackbar Component on mobile: ', () => {
  const OpenSnackbarMock = jest.fn();

  it('Renders properly', () => {
    render(<MockComponent OpenSnackbar={OpenSnackbarMock} width={600} />);
    expect(
      screen.getByLabelText('mobile copy to clipboard button')
    ).toBeInTheDocument();
    expect(screen.getByTestId('ContentCopyIcon')).toBeInTheDocument();
    expect(
      screen.getByLabelText('mobile copy to clipboard button')
    ).not.toHaveAttribute('disabled');
  });

  it('On click adds url to clipboard', () => {
    render(<MockComponent OpenSnackbar={OpenSnackbarMock} width={600} />);
    const button = screen.getByLabelText('mobile copy to clipboard button');
    userEvent.click(button);
    expect(OpenSnackbarMock).toHaveBeenCalled();
    expect(OpenSnackbarMock).toHaveBeenCalledTimes(1);
  });
});
