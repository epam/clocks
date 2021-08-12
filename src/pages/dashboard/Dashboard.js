import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import moment from 'moment-timezone';
import { lookupTimezones, sortBestMatch } from '../../helpers';
import Location from '../../containers/location';
import Navbar from '../../containers/navbar';
import { CreateLocationForm } from '../../components/create-location-form/CreateLocationForm';
import { LocationsContext } from '../../context/locations';

// import css from './dashboard.module.scss';

const dummyData = [
    {
        city: 'Chaghcharan',
        city_ascii: 'Chaghcharan',
        lat: 34.5167011,
        lng: 65.25000063,
        pop: 15000,
        country: 'Afghanistan',
        iso2: 'AF',
        iso3: 'AFG',
        province: 'Ghor',
        timezone: 'Asia/Kabul'
    },
    {
        city: 'Springfield',
        city_ascii: 'Springfield',
        lat: 37.18001609,
        lng: -93.31999923,
        pop: 180691,
        country: 'United States of America',
        iso2: 'US',
        iso3: 'USA',
        province: 'Missouri',
        state_ansi: 'MO',
        timezone: 'America/Chicago'
    },
    {
        city: 'Seoul',
        city_ascii: 'Seoul',
        lat: 37.5663491,
        lng: 126.999731,
        pop: 9796000,
        country: 'South Korea',
        iso2: 'KR',
        iso3: 'KOR',
        province: 'Seoul',
        timezone: 'Asia/Seoul'
    }
];

const Dashboard = () => {
    const { state } = useContext(LocationsContext);

    const [places, setPlaces] = React.useState(dummyData || []);
    React.useEffect(() => {
        const myTimezone = moment.tz.guess();
        const matchingTimezones = lookupTimezones(myTimezone);
        const bestMatch = sortBestMatch(myTimezone, matchingTimezones);
        setPlaces(prevState => [...prevState, bestMatch[0].target]);
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
        </>
    );
};

export default Dashboard;
