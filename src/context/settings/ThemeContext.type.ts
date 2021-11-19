import { IContext } from '../../types/context';

interface IState {
    isSettingsModalOpen: boolean;
}

interface IActions {
    SettingsModalHandler: (isOpen?: boolean) => void;
}

interface ISettingsContext extends IContext<IState, IActions> {}

export type { ISettingsContext };
