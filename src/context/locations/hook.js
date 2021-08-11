import { useMemo, useState } from 'react';

export const useLocations = () => {
    const [hasCreateForm, setHasCreateForm] = useState(false);
    const userCurrentTimeZone = useMemo(() => {}, []);

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            return setHasCreateForm(hasForm);
        }
        setHasCreateForm(!hasCreateForm);
    };

    return {
        state: { userCurrentTimeZone, hasCreateForm },
        actions: { CreateFormHandler }
    };
};
