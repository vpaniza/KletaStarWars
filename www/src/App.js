/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */

import './normalize.scss';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Film from './pages/Film';
import People from './pages/People';
import Planet from './pages/Planet';

/* const API_BASE_URL = 'http://localhost:8080/';
const API_FILMS_URL = `${API_BASE_URL}films`;
const API_PEOPLE_URL = `${API_BASE_URL}people`;
const API_PLANETS_URL = `${API_BASE_URL}planets`; */


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/films/:id" element={<Film />} />
          <Route path="/people/:id" element={<People />} />
          <Route path="/planets/:id" element={<Planet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
