import { useState } from 'react';

import { useUrl } from '../../hooks/useUrl/useUrl';
import { IAppLocation } from '../../lib/interfaces';
import { ILocationContext } from './LocationsContext.interface';

export const useLocations = (): ILocationContext => {
  const [locations] = useState<IAppLocation[]>([]);

  const {
    AddComment,
    AddLocation,
    DeleteLocation,
    ResetUrl,
    GetLocationsFromUrl
  } = useUrl();

  return {
    state: { locations },
    actions: {
      AddLocation,
      DeleteLocation,
      ResetUrl,
      GetLocationsFromUrl,
      AddComment
    }
  };
};
