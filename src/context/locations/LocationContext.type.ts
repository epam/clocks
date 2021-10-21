import { ILocation, TLocationId } from '../../types/location';
import { IContext } from '../../types/context';

interface IState {
    hasCreateForm: boolean;
    locations: ILocation[];
}

interface IActions {
    CreateFormHandler: (hasForm?: boolean) => void;
    ChangeUserCurrentLocation: (locationId: TLocationId) => void;
    AddLocation: (locationId: TLocationId, comment: string) => void;
    DeleteLocation: (locationId: TLocationId) => void;
    ResetUrl: () => void;
    GetLocationsFromUrl: () => TLocationId[];
    AddComment: (locationId: TLocationId, comment: string) => void;
}

export interface ILocationContext extends IContext {
    state: Partial<IState>;
    actions: Partial<IActions>;
}
