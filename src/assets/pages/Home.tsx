import { useEffect, useState } from "react";
import { getPokemonById, getPokemonByName } from "../services/pokemonApi";
import { PokemonCardData } from "../types/Pokemon";
import PokemonGrid from "../components/PokemonGrid";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";
import { transformPokemonData } from "../services/transformers";

function Home() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [homePokemons, setHomePokemons] = useState([
    25, 149, 448, 254, 392, 6, 419, 559,
  ]);

  useEffect(() => {
    async function loadInicialPokemons() {
      try {
        setLoading(true);
        const data = await Promise.all(
          homePokemons.map(async (id) => {
            const pokemon = await getPokemonById(id);
            if (!pokemon) {
              throw new Error("Pokemon no encontrado");
            }
            return transformPokemonData(pokemon);
          }),
        );
        setPokemons(data);
      } catch {
        setError("ERROR CARGANDO POKEMONS");
      } finally {
        setLoading(false);
      }
    }
    loadInicialPokemons();
  }, []);

  const handleSearch = (searchValue: string) => {
    let filter = Number(searchValue);

    if (isNaN(filter)) {
      // BUSQUEDA POR NOMBRE
      async function searchName() {
        const PokemonSearchName = await getPokemonByName(searchValue);

        if (!PokemonSearchName) {
          setError("pokemon no encontrado");
        } else {
          const PokemonName = [transformPokemonData(PokemonSearchName)];
          setPokemons(PokemonName);
          setError("");
        }
      }
      searchName();
    } else {
      // BUSQUEDA POR ID
      async function searchId() {
        if (filter !== 0) {
          const PokemonSearchId = await getPokemonById(filter);
          if (!PokemonSearchId) {
            setError("pokemon no encontrado");
          } else {
            const pokemonId = [transformPokemonData(PokemonSearchId)];
            setPokemons(pokemonId);
            setError("");
          }
        }
      }
      searchId();
    }
  };

  return (
    <>
      <Hero handleSearch={handleSearch} />

      {loading && <Loader />}

      {error && <ErrorMessage error={error} />}

      {!loading && !error && <PokemonGrid pokemons={pokemons} />}

      <Footer />
    </>
  );
}

export default Home;
