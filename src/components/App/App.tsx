import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from '../../context/locations';
import Dashboard from '../../pages/Dashboard';

import '../../assets/styles/index.scss';
import { SnackbarProvider } from '../../context/snackbar';
import { PlanningModeProvider } from '../../context/planningMode';
import { ModalProvider } from '../../context/modal';
import { ThemeProvider } from '../../context/theme';
import { SettingsProvider } from '../../context/settings';
import { ScreenSizesProvider } from '../../context/screenSizes';

function App() {
  return (
    <ThemeProvider>
      <ScreenSizesProvider>
        <SettingsProvider>
          <SnackbarProvider>
            <PlanningModeProvider>
              <ModalProvider>
                <LocationsProvider>
                  <Switch>
                    <Route>
                      <Dashboard />
                    </Route>
                  </Switch>
                </LocationsProvider>
              </ModalProvider>
            </PlanningModeProvider>
          </SnackbarProvider>
        </SettingsProvider>
      </ScreenSizesProvider>
    </ThemeProvider>
  );
}

export default App;
