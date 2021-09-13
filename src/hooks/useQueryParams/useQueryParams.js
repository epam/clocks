// import { useMemo } from 'react';
// import qs from 'qs';
import { useHistory, useLocation } from 'react-router-dom';

const useQueryParams = () => {
    const history = useHistory();
    const location = useLocation();

    // const queryParams = useMemo(() => qs.parse(location.search, { ignoreQueryPrefix: true }), [location.search]);

    // const SetParam = (name, value) => {
    //     const urlParams = { ...queryParams, [name]: value };
    //     const url = qs.stringify(urlParams);
    //     history.push({ search: url });
    // };

    // const GetParam = name => {
    //     const paramValue = queryParams && queryParams[name];
    //     if (typeof paramValue === 'string') {
    //         const parsedValue = JSON.parse(paramValue);
    //         if (typeof parsedValue === 'string') {
    //             return JSON.parse(parsedValue);
    //         }
    //         return parsedValue;
    //     }
    //     return paramValue;
    // };

    const GetParam = paramName => {
        const usp = new URLSearchParams(location.search.replace('?', ''));
        let paramValue = JSON.parse(usp.get(paramName));
        if (typeof paramValue === 'string') {
            paramValue = JSON.parse(paramValue);
        }
        return paramValue;
    };

    const SetParam = (paramName, paramValue) => {
        const ups = new URLSearchParams(location.search.replace('?', ''));
        ups.set(paramName, JSON.stringify(paramValue));
        const url = ups.toString();
        history.push(`?${url}`);
    };

    return { SetParam, GetParam };
};
export { useQueryParams };
