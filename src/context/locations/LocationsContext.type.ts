import { IAppLocation, TLocationId } from '../../types/location';
import { IContext } from '../../types/context';

interface IState {
    hasCreateForm: boolean;
    locations: IAppLocation[];
}

interface IActions {
    CreateFormHandler: (hasForm?: boolean) => void;
    ChangeUserCurrentLocation: (locationId: TLocationId) => void;
    AddLocation: (locationId: TLocationId, comment?: string) => void;
    DeleteLocation: (locationId: TLocationId) => void;
    ResetUrl: () => void;
    GetLocationsFromUrl: () => TLocationId[];
    AddComment: (locationId: TLocationId, comment: string) => void;
    SetLocationsFromUrl: () => Promise<void>;
}

interface ILocationContext extends IContext<IState, IActions> {}

export type { ILocationContext };
