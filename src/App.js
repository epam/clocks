import React from 'react';
import './assets/styles/index.scss';
import { LocationsProvider } from './context';
import { Dashboard } from './pages/dashboard/Dashboard';

function App() {
    return (
        <div className="App">
            <LocationsProvider>
                <Dashboard />
            </LocationsProvider>
        </div>
    );
}

export default App;
