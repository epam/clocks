import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const useQueryParams = () => {
    const history = useHistory();
    const location = useLocation();

    const params = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params;
    }, [location.search]);

    const SetParam = (name, value) => {
        params.set(name, JSON.stringify(value));
        const paramsStr = params.toString();
        history.push(`${location.pathname}?${paramsStr}`);
    };

    const GetParam = name => {
        const param = JSON.parse(params.get(name));
        if (typeof param === 'string') {
            return JSON.parse(param);
        }
        return param;
    };

    // const queryParams = JSON.parse('{}');

    // const SetParam = (name, value) => history.push({ search: JSON.stringify({ ...queryParams, [name]: value }) });

    // const ClearParams = () => history.push({ search: JSON.stringify({}) });

    // const MergeParams = values => history.push({ search: JSON.stringify({ ...queryParams, ...values }) });

    // const ResetParams = name => {
    //     const newParams = { ...queryParams };
    //     if (newParams[name]) {
    //         delete newParams[name];
    //     }
    //     history.push({ search: JSON.stringify({ ...newParams }) });
    // };

    // const GetParam = name => {
    //     return queryParams && queryParams[name];
    // };

    return { SetParam, GetParam };
};
export { useQueryParams };
