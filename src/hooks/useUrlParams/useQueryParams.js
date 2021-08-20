import { useMemo } from 'react';
import qs from 'qs';
import { useHistory, useLocation } from 'react-router-dom';

const useQueryParams = () => {
    const history = useHistory();
    const location = useLocation();

    const queryParams = useMemo(() => qs.parse(location.search, { ignoreQueryPrefix: true }), [location.search]);

    const SetParam = (name, value) => {
        debugger;
        const url = { ...queryParams, [name]: value };
        history.push({ search: qs.stringify(url) });
    };

    const ClearParams = () => history.push({ search: qs.stringify({}) });

    const MergeParams = values => history.push({ search: qs.stringify({ ...queryParams, ...values }) });

    const ResetParams = name => {
        const newParams = { ...queryParams };
        if (newParams[name]) {
            delete newParams[name];
        }
        history.push({ search: qs.stringify({ ...newParams }) });
    };

    const GetParam = name => {
        const paramValue = queryParams && queryParams[name];
        if (typeof paramValue === 'string') {
            const parsedValue = JSON.parse(paramValue);
            if (typeof parsedValue === 'string') {
                return JSON.parse(parsedValue);
            }
            return parsedValue;
        }
        return paramValue;
    };

    return { SetParam, GetParam, ClearParams, MergeParams, ResetParams };
};
export { useQueryParams };
