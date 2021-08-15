import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';

import { CreateLocationForm } from '../../components/create-location-form/CreateLocationForm';
import { LocationsContext } from '../../context/locations';
import Location from '../../containers/location';
import Navbar from '../../containers/navbar';
import Footer from '../../containers/footer';
import handler from '../../handler/handler';

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

    const [places, setPlaces] = React.useState([]);

    React.useEffect(() => {
        const array = handler(data);
        setPlaces(array);
    }, []);

    return (
        <>
            <Navbar />
            <Grid style={{ maxWidth: '100%' }} container justifyContent="center" spacing={2}>
                {places.map((props, index) => (
                    <Grid item xs key={index}>
                        <Location {...props} />
                    </Grid>
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
