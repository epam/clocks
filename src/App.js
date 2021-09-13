import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from './context/locations';
import Dashboard from './pages/dashboard';
import './assets/styles/index.scss';
import { SnackbarProvider } from './context/snackbar';

function App() {
    return (
        <SnackbarProvider>
            <LocationsProvider>
                <div className="App">
                    <Switch>
                        <Route>
                            <Dashboard />
                        </Route>
                    </Switch>
                </div>
            </LocationsProvider>
        </SnackbarProvider>
    );
}

export default App;
