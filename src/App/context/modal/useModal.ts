import { useState } from 'react';

import { TLocationId } from '../../lib/types';
import { IModalContextState } from './ModalContext.interface';

export const useModal = (defaultValues?: IModalContextState) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(
    defaultValues?.isModalOpen || false
  );
  const [locationId, setLocationId] = useState<TLocationId>(
    defaultValues?.locationId || ''
  );

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
