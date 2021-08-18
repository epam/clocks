import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import { LocationsContext } from '../../context/locations';
import Location from '../../containers/location';
import Navbar from '../../containers/navbar';
import Footer from '../../containers/footer';
import { handleResize } from '../../handlers';
import InputModal from '../../containers/inputModal';

// import css from './dashboard.module.scss';

const Dashboard = () => {
    const { state, actions } = useContext(LocationsContext);
    const [width, setWidth] = useState(280);

    useEffect(() => {
        const handle = () => setWidth(handleResize(state.locations.length || 1));

        window.addEventListener('resize', handle);

        handle();

        return () => window.removeEventListener('resize', handle);
    }, [state.locations.length]);

    return (
        <>
            <Navbar />
            <Grid style={{ maxWidth: '100%' }} container spacing={2}>
                {state.locations &&
                    state.locations.map((props, index) => (
                        <div style={{ width }} key={index}>
                            <Location {...props} width={width} />
                        </div>
                    ))}
                <InputModal visibility={state.hasCreateForm} onClose={() => actions.CreateFormHandler(false)} />
            </Grid>
            <Footer />
        </>
    );
};

export default Dashboard;
