import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from './context/locations';
import Dashboard from './pages/dashboard';
import './assets/styles/index.scss';

function App() {
    useEffect(() => {
        // history.push('dashboard');
    }, []);

    return (
        <LocationsProvider>
            <div className="App">
                <Switch>
                    <Route>
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </LocationsProvider>
    );
}

export default App;
