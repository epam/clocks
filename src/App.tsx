import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from './context/locations';
import Dashboard from './pages/Dashboard';
import './assets/styles/index.scss';
import { SnackbarProvider } from './context/snackbar';
import { PlanningModeProvider } from './context/planningMode';
import { ModalProvider } from './context/modal';
import { ThemeProvider } from './context/theme';

function App() {
    return (
        <ThemeProvider>
            <SnackbarProvider>
                <PlanningModeProvider>
                    <ModalProvider>
                        <LocationsProvider>
                            <div className="App">
                                <Switch>
                                    <Route>
                                        <Dashboard />
                                    </Route>
                                </Switch>
                            </div>
                        </LocationsProvider>
                    </ModalProvider>
                </PlanningModeProvider>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
