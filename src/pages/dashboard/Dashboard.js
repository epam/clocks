import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';

import { CreateLocationForm } from '../../components/create-location-form/CreateLocationForm';
import { LocationsContext } from '../../context/locations';
import Location from '../../containers/location';
import Navbar from '../../containers/navbar';
import Footer from '../../containers/footer';
import { convertArray, handleResize } from '../../handlers';

// import css from './dashboard.module.scss';

const data = [
    {
        city: 'Chaghcharan',
        country: 'Afghanistan',
        timezone: 'Asia/Kabul',
        message: ''
    },
    {
        city: 'Springfield',
        country: 'United States of America',
        timezone: 'America/Chicago',
        message: ''
    },
    {
        city: 'Seoul',
        country: 'South Korea',
        timezone: 'Asia/Seoul',
        message: ''
    },
    {
        city: 'Tashkent',
        country: 'Uzbekistan',
        timezone: 'Asia/Tashkent',
        message: ''
    }
];

const Dashboard = () => {
    const { state } = useContext(LocationsContext);
    const [places, setPlaces] = useState([]);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const array = convertArray(data);
        setPlaces(array);
    }, []);

    useEffect(() => {
        const handle = () => setWidth(handleResize(places.length || 1));

        window.addEventListener('resize', handle);

        handle();

        return () => window.removeEventListener('resize', handle);
    }, [places.length]);

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
                {state.hasCreateForm && (
                    <Grid item xs>
                        <CreateLocationForm />
                    </Grid>
                )}
            </Grid>
            <Footer />
        </>
    );
};

export default Dashboard;
