import { IContext } from '../../types/context';
import { TLocationId } from '../../types/location';

interface IState {
    isModalOpen: boolean;
    locationId: TLocationId;
}

interface IActions {
    ModalHandler: (isModalOpen?: boolean) => void;
    OpenDeleteModal: (locationId: TLocationId) => void;
}
interface IModalContext extends IContext<IState, IActions> {}

export type { IModalContext };
