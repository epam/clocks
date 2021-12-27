import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DeleteModal from './DeleteModal';

const MockDeleteLocation = jest.fn();
const MockModalHandler = jest.fn();

describe('test for DeleteModal component', () => {
  it('renders delete text', () => {
    const { getByRole, getByText } = render(
      <DeleteModal
        isOpen
        modalHandler={MockModalHandler}
        deleteLocation={MockDeleteLocation}
      />
    );
    const deleteText = getByText(/Are you sure you want to delete?/);
    const deleteButton = getByRole('button', { name: /delete/i });
    const cancelButton = getByRole('button', { name: /cancel/i });
    expect(deleteText).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  it('call delete function by clicking Delete button', () => {
    const { getByRole } = render(
      <DeleteModal
        isOpen
        modalHandler={MockModalHandler}
        deleteLocation={MockDeleteLocation}
      />
    );
    const deleteButton = getByRole('button', { name: /delete/i });
    userEvent.click(deleteButton);
    expect(MockDeleteLocation).toHaveBeenCalledTimes(1);
    expect(MockModalHandler).toHaveBeenCalledTimes(1);
  });
  it('call ModalHandler function in order to close modal by clicking Cancel button', () => {
    const { getByRole } = render(
      <DeleteModal
        isOpen
        modalHandler={MockModalHandler}
        deleteLocation={MockDeleteLocation}
      />
    );
    const cancelButton = getByRole('button', { name: /cancel/i });
    userEvent.click(cancelButton);
    expect(MockModalHandler).toHaveBeenCalledTimes(1);
  });
});
