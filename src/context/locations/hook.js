import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cityMapping } from 'city-timezones';
import { getCurrentUserLocation, convertArray, convertToArrayWithIdField, generateIdFormat } from '../../handlers';
import convertFromUrlLocations from '../../handlers/convertFromUrlLocations';
import { useQueryParams } from '../../hooks/useUrlParams/useQueryParams';

const paramKeyWord = 'locations';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [hasCreateForm, setHasCreateForm] = useState(false);
    const CityMapping = useMemo(() => convertToArrayWithIdField(cityMapping), []);

    const location = useLocation();

    const { SetParam, GetParam } = useQueryParams();

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            setHasCreateForm(hasForm);
        } else {
            setHasCreateForm(prevState => !prevState);
        }
    };

    const CheckForCityExistance = (locations, locationId) => {
        return !!locations.find(location => location.startsWith(locationId));
    };

    const AddLocation = ({ cityAscii, iso2, lat, lng, message = '' }) => {
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        const isCityAlreadyAdded = CheckForCityExistance(locationsFromUrl, locationId);
        if (isCityAlreadyAdded) {
            return alert('This city has already been added!');
        }
        locationsFromUrl.push(`${locationId}__${message}`);
        SetParam(paramKeyWord, locationsFromUrl);
    };

    const ResetUrl = () => {
        const { city_ascii: cityAscii, iso2, lat, lng } = getCurrentUserLocation();
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        const locations = [locationId];
        SetParam(paramKeyWord, locations);
    };

    const DeleteLocation = ({ city, country, timezone }) => {
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const filteredLocations = locationsFromUrl.filter(
            location => !(location.city === city && location.country === country && location.timezone === timezone)
        );
        SetParam(paramKeyWord, filteredLocations);
    };

    useEffect(() => {
        let locations = GetParam(paramKeyWord) || [];
        const { city_ascii: cityAscii, iso2, lat, lng } = getCurrentUserLocation();
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        if (!locations || !locations.length) {
            locations = [locationId];
            return SetParam(paramKeyWord, locations);
        }
        if (!Array.isArray(locations)) {
            return console.error('Locations are not valid');
        }
        const currentUserExists = CheckForCityExistance(locations, locationId);
        if (!currentUserExists) {
            AddLocation({ cityAscii, iso2, lat, lng });
        }
    }, []);

    useEffect(() => {
        let locationsFromUlrParams = GetParam(paramKeyWord) || [];
        locationsFromUlrParams = convertFromUrlLocations(locationsFromUlrParams);
        if (!Array.isArray(locationsFromUlrParams)) {
            return console.error('Locations from url must be array');
        }
        // const convertedLocations = convertArray(locationsFromUlrParams);
        const convertedLocations = convertArray([]);
        setLocations(convertedLocations);
    }, [location.search]);

    return {
        state: { hasCreateForm, locations, CityMapping },
        actions: { CreateFormHandler, AddLocation, DeleteLocation, ResetUrl }
    };
};
