import { useState } from 'react';
import { TLocationId } from '../../types/location';

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [locationId, setLocationId] = useState<TLocationId>('');

    const ModalHandler = (isModalOpen?: boolean) => {
        if (typeof isModalOpen === 'boolean') {
            return setIsModalOpen(isModalOpen);
        }
        setIsModalOpen(prev => !prev);
    };

    const OpenDeleteModal = (locationId: TLocationId) => {
        setIsModalOpen(true);
        setLocationId(locationId);
    };

    return {
        state: { isModalOpen, locationId },
        actions: { ModalHandler, OpenDeleteModal }
    };
};
