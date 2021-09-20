import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from './context/locations';
import Dashboard from './pages/dashboard';
import './assets/styles/index.scss';
import { SnackbarProvider } from './context/snackbar';
import { PlanningModeProvider } from './context/planningMode';

function App() {
    return (
        <SnackbarProvider>
            <PlanningModeProvider>
                <LocationsProvider>
                    <div className="App">
                        <Switch>
                            <Route>
                                <Dashboard />
                            </Route>
                        </Switch>
                    </div>
                </LocationsProvider>
            </PlanningModeProvider>
        </SnackbarProvider>
    );
}

export default App;
