import './App.css';
import React from 'react';
import CardSelection from './components/CardSelection';
import CardSelectionLite from './components/CardSelectionLite'
function App() {

    return (
        <div className="App" id='app'>
            <CardSelectionLite />
            {/*<CardSelection/>*/}
        </div>
    );
}

export default App;
