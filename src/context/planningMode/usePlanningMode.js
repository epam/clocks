import { useState } from 'react';

export const usePlanningMode = () => {
    const [isPlanningModeOn, setIsPlanningModeOn] = useState(false);

    const PlanningModeHandler = isPlanningModeOn => {
        if (typeof isPlanningModeOn === 'boolean') {
            return setIsPlanningModeOn(isPlanningModeOn);
        }
        setIsPlanningModeOn(prev => !prev);
    };

    return {
        state: { isPlanningModeOn },
        actions: { PlanningModeHandler }
    };
};
