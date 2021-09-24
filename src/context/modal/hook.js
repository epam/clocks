import { useState } from 'react';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationId, setLocationId] = useState('');

    const ModalHandler = isModalOpen => {
        if (typeof isModalOpen === 'boolean') {
            return setIsModalOpen(isModalOpen);
        }
        setIsModalOpen(prev => !prev);
    };

    const OpenDeleteModal = locationId => {
        setIsModalOpen(true);
        setLocationId(locationId);
    };

    return {
        state: { isModalOpen, locationId },
        actions: { ModalHandler, OpenDeleteModal }
    };
};
