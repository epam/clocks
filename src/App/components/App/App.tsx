import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from '../../context/locations';
import Dashboard from '../../pages/Dashboard';

import { ThemeProvider } from '../../context/theme';
import { SettingsProvider } from '../../context/settings';
import { SnackbarProvider } from '../../context/snackbar';
import { PlanningModeProvider } from '../../context/planningMode';

import '../../dictionary/index';
import '../../styles/index.scss';

function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <SnackbarProvider>
          <PlanningModeProvider>
            <LocationsProvider>
              <Switch>
                <Route>
                  <Dashboard />
                </Route>
              </Switch>
            </LocationsProvider>
          </PlanningModeProvider>
        </SnackbarProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}

export default App;
