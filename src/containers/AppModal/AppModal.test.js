import React from 'react';
import { render } from '@testing-library/react';
import AppModal from './AppModal';
import { ModalContext, useModal } from '../../context/modal';
import { LocationsContext } from '../../context/locations';

const MockComponent = ({ name, value, DeleteLocationMock }) => {
    const store = useModal();
    const locationStore = { actions: { DeleteLocation: DeleteLocationMock }, state: {} };
    store.state[name] = value;
    return (
        <LocationsContext.Provider value={locationStore}>
            <ModalContext.Provider value={store}>
                <AppModal />
            </ModalContext.Provider>
        </LocationsContext.Provider>
    );
};

describe('test for AppModal component', () => {
    it('renders delete text', () => {
        const DeleteLocation = jest.fn();
        const { getByText, debug } = render(
            <MockComponent name="isModalOpen" value="true" DeleteLocationMock={DeleteLocation} />
        );
        debug();
    });
});
