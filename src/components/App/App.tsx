import { Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '../../context/theme';
import { ScreenSizesProvider } from '../../context/screenSizes';
import { SettingsProvider } from '../../context/settings';
import { SnackbarProvider } from '../../context/snackbar';
import { PlanningModeProvider } from '../../context/planningMode';
import { ModalProvider } from '../../context/modal';
import { LocationsProvider } from '../../context/locations';
import Dashboard from '../../pages/Dashboard';
import '../../assets/styles/index.scss';

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
