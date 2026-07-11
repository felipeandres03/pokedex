import Home from "./assets/pages/Home";
import Pokedex from "./assets/pages/Pokedex";
import Favorites from "./assets/pages/Favorites";
import PokemonDetails from "./assets/pages/PokemonDetails";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
      </Routes>
    </>
  );
}

export default App;
