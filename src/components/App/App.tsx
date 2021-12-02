import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from '../../context/locations';
import Dashboard from '../../pages/Dashboard';
import '../../assets/styles/index.scss';
import { SnackbarProvider } from '../../context/snackbar';
import { PlanningModeProvider } from '../../context/planningMode';
import { ModalProvider } from '../../context/modal';
import { ThemeProvider } from '../../context/theme';
import { SettingsProvider } from '../../context/settings';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
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
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
