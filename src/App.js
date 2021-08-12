import React from 'react';
import { LocationsProvider } from './context/locations';
import Dashboard from './pages/dashboard';
import './assets/styles/index.scss';

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
