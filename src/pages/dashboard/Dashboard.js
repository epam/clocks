import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import { LocationsContext } from '../../context/locations';
import Location from '../../containers/location';
import Navbar from '../../containers/navbar';
import Footer from '../../containers/footer';
import { handleResize } from '../../handlers';
import InputDrawer from '../../containers/inputDrawer';

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

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.ctrlKey && event.code === 'KeyQ') {
                actions.CreateFormHandler();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <>
            <Navbar />
            <Grid style={{ maxWidth: '100%', margin: '0 auto' }} container>
                {state.locations &&
                    state.locations.map((props, index) => (
                        <div style={{ width }} key={index}>
                            <Location {...props} width={width} />
                        </div>
                    ))}
                <InputDrawer
                    visibility={state.hasCreateForm}
                    setVisibility={value => actions.CreateFormHandler(value)}
                />
            </Grid>
            <Footer />
        </>
    );
};

export default Dashboard;
