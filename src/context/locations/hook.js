import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentUserLocation, convertArray } from '../../handlers';
import { useUrlParams } from '../../hooks/useUrlParams/useUrlParams';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [hasCreateForm, setHasCreateForm] = useState(false);

    const location = useLocation();

    const { SetParam, GetParam } = useUrlParams();

    const GetLocationsFromParams = () => {
        return GetParam('locations') || [];
    };

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            setHasCreateForm(hasForm);
        } else {
            setHasCreateForm(prevState => !prevState);
        }
    };

    useEffect(() => {
        const locations = GetLocationsFromParams();
        if (!locations || !locations.length) {
            const { city, country, timezone } = getCurrentUserLocation();
            const locations = [
                {
                    city,
                    country,
                    timezone,
                    message: ''
                }
            ];
            SetParam('locations', JSON.stringify(locations));
        }
    }, []);

    useEffect(() => {
        const locationsFromUlrParams = GetLocationsFromParams();
        const convertedLocations = convertArray(locationsFromUlrParams);
        setLocations(convertedLocations);
    }, [location.search]);

    const AddLocation = ({ city, country, message = '', timezone }) => {
        const locationsFromUrl = GetLocationsFromParams();
        locationsFromUrl.push({ city, country, message, timezone });
        SetParam('locations', locationsFromUrl);
    };

    const DeleteLocation = () => {
        // delete logic here
    };

    return {
        state: { hasCreateForm, locations },
        actions: { CreateFormHandler, AddLocation, DeleteLocation }
    };
};
