import { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard';

import Footer from '../Footer';
import '../../dictionary/index';
import '../../styles/index.scss';
import Navbar from '../Navbar';

const App: FC = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Switch>
        <Route>
          <Dashboard />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default App;
