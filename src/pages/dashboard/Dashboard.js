import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Location } from '../../components/location/Location';
import { Navbar } from '../../components/navbar/Navbar';

export const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <main>
                <section className="section content-center">
                    <Grid container justifyContent="center" spacing={2}>
                        {new Array(5).fill(0).map((_, index) => (
                            <div className="col-md-4" key={index}>
                                <Location />
                            </div>
                        ))}
                    </Grid>
                </section>
            </main>
        </div>
    );
};
