import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';

import Footer from '../Footer';
import { PlanningModeProvider } from '../../context/planningMode';
import '../../dictionary/index';
import '../../styles/index.scss';

const App: FC = () => {
  return (
    <PlanningModeProvider>
      <Switch>
        <Route>
          <Dashboard />
        </Route>
      </Switch>
      <Footer />
    </PlanningModeProvider>
  );
};

export default App;
