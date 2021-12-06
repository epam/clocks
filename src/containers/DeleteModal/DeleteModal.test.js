import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteModal from './DeleteModal';
import { ModalContext } from '../../context/modal';
import { LocationsContext } from '../../context/locations';

const MockDeleteLocation = jest.fn();
const MockModalHandler = jest.fn();
const locationId = 'Tashkent_UZ_41_69';

const wrapper = children => {
  const locationStore = {
    actions: { DeleteLocation: MockDeleteLocation }
  };
  const modalStore = {
    state: { isModalOpen: true, locationId },
    actions: { ModalHandler: MockModalHandler }
  };
  return (
    <LocationsContext.Provider value={locationStore}>
      <ModalContext.Provider value={modalStore}>
        {children}
      </ModalContext.Provider>
    </LocationsContext.Provider>
  );
};

describe('test for DeleteModal component', () => {
  it('renders delete text', () => {
    const { getByRole, getByText } = render(wrapper(<DeleteModal />));
    const deleteText = getByText(/Are you sure you want to delete?/);
    const deleteButton = getByRole('button', { name: /delete/i });
    const cancelButton = getByRole('button', { name: /cancel/i });
    expect(deleteText).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });
  it('call delete function by clicking Delete button', () => {
    const { getByRole } = render(wrapper(<DeleteModal />));
    const deleteButton = getByRole('button', { name: /delete/i });
    userEvent.click(deleteButton);
    expect(MockDeleteLocation).toHaveBeenCalledTimes(1);
    expect(MockDeleteLocation).toHaveBeenCalledWith(locationId);
  });
  it('call ModalHandler function in order to close modal by clicking Cancel button', () => {
    const { getByRole } = render(wrapper(<DeleteModal />));
    const cancelButton = getByRole('button', { name: /cancel/i });
    userEvent.click(cancelButton);
    expect(MockModalHandler).toHaveBeenCalledTimes(1);
    expect(MockModalHandler).toHaveBeenCalledWith(false);
  });
});
