import { IContext } from '../../types/context';
import { TLocationId } from '../../types/location';

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
