import { useEffect, useState } from "react";
import { getPokemonById, getPokemonByName } from "../services/pokemonApi";
import { PokemonCardData } from "../types/Pokemon";
import PokemonGrid from "../components/PokemonGrid";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import ExplorerSection from "../components/ExplorerSection";
import Footer from "../components/Footer";
import { transformPokemonData } from "../services/transformers";
import { Link } from "react-router-dom";

function Home() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateRandomPokemons = () => {
    const randomPokemons = [];
    for (let i = 0; i < 8; i++) {
      const randomId = Math.floor(Math.random() * 1025) + 1;
      randomPokemons.push(randomId);
    }
    return randomPokemons;
  };

  const [homePokemons, setHomePokemons] = useState(generateRandomPokemons());

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
  }, [homePokemons]);

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
      <NavBar />
      <main className="home">
        <Hero handleSearch={handleSearch} />

        <ExplorerSection />
        <section className="home-showcase">
          <div className="home-showcase__header">
            <div className="home-showcase__content">
              <span className="home-showcase__tag">FEATURED POKÉMON</span>

              <h2 className="home-showcase__title">Begin Your Journey</h2>

              <p className="home-showcase__description">
                Discover a curated selection of Pokémon before exploring the
                complete Pokédex. Every adventure starts with a single Pokémon.
              </p>
            </div>
          </div>

          {loading && <Loader />}

          {error && <ErrorMessage error={error} />}

          {!loading && !error && <PokemonGrid pokemons={pokemons} />}

          <div className="home-showcase__actions">
            <Link to="/pokedex" className="btn btn-primary btn--medium">
              View All →
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default Home;
