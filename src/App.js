import './App.css';
import React from 'react';
import CardSelection from './components/CardSelection';
import CardSelectionLite from './components/CardSelectionLite'
function App() {

    return (
        <div className="App" id='app'>
            <h3>Poker Win Rate Calculator</h3>
            <CardSelectionLite />
            {/*<CardSelection/>*/}
        </div>
    );
}

export default App;
