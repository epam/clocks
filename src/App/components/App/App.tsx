import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from '../../context/locations';
import Dashboard from '../../pages/Dashboard';

import { ThemeProvider } from '../../context/theme';
import { SnackbarProvider } from '../../context/snackbar';
import { PlanningModeProvider } from '../../context/planningMode';

import '../../dictionary/index';
import '../../styles/index.scss';

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
