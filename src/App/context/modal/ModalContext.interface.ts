import { IContext } from '../../lib/interfaces';
import { TLocationId } from '../../lib/types';

export interface IModalContextState {
  isModalOpen: boolean;
  locationId: TLocationId;
}

interface IModalContextActions {
  ModalHandler: (isModalOpen?: boolean) => void;
  OpenDeleteModal: (locationId: TLocationId) => void;
}
interface IModalContext
  extends IContext<IModalContextState, IModalContextActions> {}

export type { IModalContext };
