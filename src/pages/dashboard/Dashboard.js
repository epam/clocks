import React, { useContext, useEffect, useState } from 'react';

import { LocationsContext } from '../../context/locations';
import Location from '../../containers/location';
import Navbar from '../../containers/navbar';
import Footer from '../../containers/footer';
import { handleResize } from '../../handlers';
import InputDrawer from '../../containers/inputDrawer';

import css from './Dashboard.module.scss';

const Dashboard = () => {
    const { state, actions } = useContext(LocationsContext);
    const [width, setWidth] = useState(280);
    const grid = React.useRef(null);

    useEffect(() => {
        const handle = () => {
            if (grid.current) setWidth(handleResize(state.locations.length || 1, grid.current));
        };

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
    }, [actions]);

    return (
        <>
            <Navbar />
            <div ref={grid} className={css.container}>
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
            <Footer />
        </>
    );
};

export default Dashboard;
