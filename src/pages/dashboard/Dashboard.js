import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Location } from '../../components/location/Location';
import { Navbar } from '../../components/navbar/Navbar';
import { data } from './fakeData';

export const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <main>
                <section className="section content-center">
                    <Grid container justifyContent="center" spacing={2}>
                        {data.map(({ timeDifferance, date, time, country, city, type }, index) => (
                            <div className="col-md-4" key={index}>
                                <Location
                                    timeDifferance={timeDifferance}
                                    time={time}
                                    date={date}
                                    city={city}
                                    country={country}
                                    type={type}
                                />
                            </div>
                        ))}
                    </Grid>
                </section>
            </main>
        </div>
    );
};
