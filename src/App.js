import './App.css';
import React from 'react';
import CardSelectionLite from './components/CardSelectionLite'
import Help from './components/Help'
function App() {

    return (
        <div className="App" id='app'>
            <h3>Poker Win Rate Calculator</h3>
            <CardSelectionLite />
            <Help/>
        </div>
    );
}

export default App;
