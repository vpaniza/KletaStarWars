import './styles/normalize.scss';
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
import Header from './components/Header';
import NavBar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login register={false} />} />
          <Route path="/register" element={<Login register={true} />} />
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
