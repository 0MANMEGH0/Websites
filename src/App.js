
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypePokemonList from './Components/TypePokemonList';
import Home from './Components/Home'
import PokemonDetails from './Components/PokemonDetails';
import Pokedex from './Components/Pokedex';
import Game from './Components/Game/Game'
import Footer from './Components/Footer'
import About from './Components/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/type/:typeName" element={<TypePokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />}/>
        <Route path="/game" element={<Game />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
