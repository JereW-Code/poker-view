import './App.css';
import React from 'react';
import CardSelectionLite from './components/CardSelectionLite'
function App() {

    return (
        <div className="App" id='app'>
            <h3>Poker Win Rate Calculator</h3>
            <CardSelectionLite />
        </div>
    );
}

export default App;
