import React, { useContext, useEffect, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import Location from '../../containers/location';
import Navbar from '../../containers/navbar';
import Footer from '../../containers/footer';
import { handleResize } from '../../handlers';
import InputDrawer from '../../containers/inputDrawer';

import css from './Dashboard.module.scss';

const Dashboard = () => {
    const { state, actions } = useContext(LocationsContext);
    const {
        state: { isSnackbarOpen, message },
        actions: { SnackbarHandler }
    } = useContext(SnackbarContext);
    const [width, setWidth] = useState(280);

    useEffect(() => {
        const handle = () => {
            setWidth(handleResize(state.locations.length || 1));
        };

        window.addEventListener('resize', handle);

        handle();

        return () => window.removeEventListener('resize', handle);
    }, [state.locations.length]);

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === '=' || event.key === '+') {
                actions.CreateFormHandler();
                event.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [actions]);

    return (
        <>
            <Navbar />
            <div className={css.container}>
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
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={isSnackbarOpen}
                autoHideDuration={3}
                message={message || ''}
                action={
                    <>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={SnackbarHandler}>
                            x
                        </IconButton>
                    </>
                }
            />
            <Footer />
        </>
    );
};

export default Dashboard;
