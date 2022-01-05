import { Switch, Route } from 'react-router-dom';
import { LocationsProvider } from '../../context/locations';
import Dashboard from '../../pages/Dashboard';
import Footer from '../Footer';

import { ThemeProvider } from '../../context/theme';
import { ScreenSizesProvider } from '../../context/screenSizes';
import { SettingsProvider } from '../../context/settings';
import { SnackbarProvider } from '../../context/snackbar';
import { PlanningModeProvider } from '../../context/planningMode';

import '../../dictionary/index';
import '../../styles/index.scss';

function App() {
  return (
    <ThemeProvider>
      <ScreenSizesProvider>
        <SettingsProvider>
          <SnackbarProvider>
            <PlanningModeProvider>
              <LocationsProvider>
                <Switch>
                  <Route path="/" exact component={Dashboard} />
                </Switch>
                <Footer />
              </LocationsProvider>
            </PlanningModeProvider>
          </SnackbarProvider>
        </SettingsProvider>
      </ScreenSizesProvider>
    </ThemeProvider>
  );
}

export default App;
