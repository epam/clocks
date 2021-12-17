import { IContext } from '../../lib/interfaces';

interface ISettingsContextState {
  isSettingsModalOpen: boolean;
}

interface ISettingsContextActions {
  SettingsModalHandler: (isOpen?: boolean) => void;
}

interface ISettingsContext
  extends IContext<ISettingsContextState, ISettingsContextActions> {}

export type { ISettingsContext };
