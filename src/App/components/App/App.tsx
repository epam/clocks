import { Switch, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Footer from '../Footer';

import { ThemeProvider } from '../../context/theme';
import { PlanningModeProvider } from '../../context/planningMode';

import '../../dictionary/index';
import '../../styles/index.scss';

function App() {
  return (
    <ThemeProvider>
      <PlanningModeProvider>
        <Switch>
          <Route>
            <Dashboard />
          </Route>
        </Switch>
        <Footer />
      </PlanningModeProvider>
    </ThemeProvider>
  );
}

export default App;
