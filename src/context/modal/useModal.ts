import { useState } from 'react';
import { TLocationId } from '../../types/location';
import { IState } from './ModalContext.type';

export const useModal = (defaultValues: IState) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(defaultValues.isModalOpen || false);
    console.log('🚀 ~ file: useModal.ts ~ line 7 ~ useModal ~ isModalOpen', isModalOpen);
    const [locationId, setLocationId] = useState<TLocationId>(defaultValues.locationId || '');

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
