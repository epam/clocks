import { IAppLocation, IContext } from '../../lib/interfaces';
import { TLocationId } from '../../lib/types';

interface ILocationsContextState {
  hasCreateForm: boolean;
  locations: IAppLocation[];
}

interface ILocationsContextActions {
  CreateFormHandler: (hasForm?: boolean) => void;
  ChangeUserCurrentLocation: (locationId: TLocationId) => void;
  AddLocation: (locationId: TLocationId, comment?: string) => void;
  DeleteLocation: (locationId: TLocationId) => void;
  ResetUrl: () => void;
  GetLocationsFromUrl: () => TLocationId[];
  AddComment: (locationId: TLocationId, comment: string) => void;
  SetLocationsFromUrl: () => Promise<void>;
}

interface ILocationContext
  extends IContext<ILocationsContextState, ILocationsContextActions> {}

export type { ILocationContext };
