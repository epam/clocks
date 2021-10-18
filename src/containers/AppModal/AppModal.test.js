import React from 'react';
import { render } from '@testing-library/react';
import AppModal from './AppModal';

describe('test for AppModal component', () => {
    it('renders delete text', () => {
        const { getByText, debug } = render(<AppModal />);
        // const deleteText = getByText(/Do you want to delete this location/);
        // expect(deleteText).toBeInTheDocument();
        debug();
    });
});
