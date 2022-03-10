import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import WRCalculator from './routes/WRCalculator'
import AIDisplay from './routes/AIDisplay'



function App() {
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/calculator">calculator</Link>
                        </li>
                        <li>
                            <Link to="/aidisplay">ai display</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/calculator' element={<WRCalculator/>} />
                    <Route path='/aidisplay' element={<AIDisplay/>} />
                </Routes>
            </div>
        </Router>
    )

}



export default App;
