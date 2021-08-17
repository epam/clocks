import { useEffect, useMemo, useState } from 'react';
// import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment-timezone';

export const useLocations = () => {
    const [hasCreateForm, setHasCreateForm] = useState(false);
    const userCurrentTimeZone = useMemo(() => moment().format('hh:mm:ss'), []);
    // const history = useHistory();
    // const location = useLocation();
    // console.log('🚀 ~ file: hook.js ~ line 10 ~ useLocations ~ location', location);

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            return setHasCreateForm(hasForm);
        }
        setHasCreateForm(!hasCreateForm);
    };

    useEffect(() => {
        // const params = new URLSearchParams(location.search);
        // history.push('/dashboard?name=test');
        // console.log(params.get('name'));
    }, []);

    return {
        state: { userCurrentTimeZone, hasCreateForm },
        actions: { CreateFormHandler }
    };
};
