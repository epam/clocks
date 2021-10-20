import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppModal from './AppModal';
import { ModalContext, ModalProvider } from '../../context/modal';
import { convertIdToObject } from '../../handlers/convertData';

const modalContext = {
    state: {
        isModalOpen: false,
        locationId: ''
    },
    actions: { ModalHandler: jest.fn(), OpenDeleteModal: jest.fn() }
};

const wrapper = ({ children }) => <ModalProvider>{children}</ModalProvider>;

describe('test for AppModal component', () => {
    it('renders empty div if modal is not open', () => {
        const { queryByText, queryAllByRole, debug } = render(<AppModal />, { wrapper });
        const deleteText = queryByText(/Do you want to delete this location/);
        const buttons = queryAllByRole(/button/);
        expect(deleteText).toBeNull();
        expect(buttons.length).toBe(0);
    });
    // it('renders modal', () => {
    //     const { getByText } = render(wrapper(<AppModal />));
    //     const deleteText = getByText(/Do you want to delete this location/);
    //     expect(deleteText).toBeInTheDocument();

    //     const deleteButton = getByText(/Delete/);
    //     expect(deleteButton).toBeEnabled();

    //     const cancelButton = getByText(/cancel/i);
    //     expect(cancelButton).toBeEnabled();
    // });
    // it('fires cancel button click event', () => {
    //     const mockContext = {
    //         ...modalContext,
    //         state: {
    //             ...modalContext.state,
    //             isModalOpen: true
    //         }
    //     };
    //     const { getByText } = render(
    //         <ModalContext.Provider value={mockContext}>
    //             <AppModal />
    //         </ModalContext.Provider>
    //     );
    //     const cancelButton = getByText(/cancel/i);
    //     userEvent.click(cancelButton);
    //     expect(cancelButton).not.toBeInTheDocument();
    // });
    // it('fires delete button click event', () => {
    //     const mockContext = {
    //         ...modalContext,
    //         state: {
    //             ...modalContext.state,
    //             isModalOpen: true,
    //             locationId: 'Namangan_UZ_41_71'
    //         }
    //     };
    //     const { getByText } = render(
    //         <ModalContext.Provider value={mockContext}>
    //             <AppModal />
    //         </ModalContext.Provider>
    //     );
    //     const deleteButton = getByText(/Delete/);
    //     userEvent.click(deleteButton);
    //     expect(deleteButton).not.toBeInTheDocument();
    //     const { city } = convertIdToObject('Namangan_UZ_41_71');
    //     const cityRegEx = new RegExp(city);
    //     expect(screen.queryByText(cityRegEx)).toBeNull();
    // });
});
