import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';
import Footer from '../Footer';
import Navbar from '../Navbar';
import '../../dictionary/index';
import '../../styles/index.scss';

import classNames from './App.module.scss';

const App: FC = () => {
  return (
    <div className={classNames.body}>
      <Navbar />
      <Switch>
        <Route>
          <Dashboard className={classNames.dashboard} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
