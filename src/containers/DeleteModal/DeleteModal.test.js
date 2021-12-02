import React from 'react';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppModal from './DeleteModal';
import { ModalContext, useModal } from '../../context/modal';
import { LocationsContext } from '../../context/locations';

const MockComponent = ({ name, value, DeleteLocationMock }) => {
  const store = useModal({ isModalOpen: true });
  const locationStore = {
    actions: { DeleteLocation: DeleteLocationMock },
    state: {}
  };
  return (
    <LocationsContext.Provider value={locationStore}>
      <ModalContext.Provider value={store}>
        <AppModal />
      </ModalContext.Provider>
    </LocationsContext.Provider>
  );
};

describe('test for AppModal component', () => {
  it('renders delete text', async () => {
    const DeleteLocation = jest.fn();
    const { getByRole } = render(
      <MockComponent
        name="isModalOpen"
        value="true"
        DeleteLocationMock={DeleteLocation}
      />
    );
    const cancelButton = getByRole('button', { name: /cancel/i });
    await act(async () => userEvent.click(cancelButton));
    // expect(cancelButton).not.toBeInTheDocument();
    // const modal = getByRole('modal');
  });
});
