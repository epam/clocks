import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { Location } from '../../containers/location/Location';
import { Navbar } from '../../containers/navbar/Navbar';
import { data } from './fakeData';
import { CreateLocationForm } from '../../components/create-location-form/CreateLocationForm';
import { LocationsContext } from '../../context/locations';

export const Dashboard = () => {
    const { state } = useContext(LocationsContext);

    return (
        <>
            <Navbar />
            <Grid container justifyContent="center" spacing={2}>
                {data.map(({ timeDifferance, date, time, country, city, type }, index) => (
                    <Grid item xs key={index}>
                        <Location
                            timeDifferance={timeDifferance}
                            time={time}
                            date={date}
                            city={city}
                            country={country}
                            type={type}
                        />
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
