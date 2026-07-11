import SearchBar from "../components/SearchBar";
import DatabaseNavigation from "../components/DatabaseNavigation";
import NavBar from "../components/NavBar";
import PokemonGrid from "../components/PokemonGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import FilterPanel from "../components/FilterPanel";
import { useState, useEffect } from "react";
import {
  getPokemonList,
  getPokemonDetails,
  getPokemonById,
  getPokemonByName,
  getpokemonsType,
  getPokemonsByGeneration,
} from "../services/pokemonApi";
import { transformPokemonData } from "../services/transformers";
import {
  BasicPokemon,
  PokemonCardData,
  pokemonsTypeResponse,
  PokemonByType,
} from "../types/Pokemon";

function Pokedex() {
  const [pokemons, setPokemons] = useState<PokemonCardData[]>([]);
  const [offset, setOffSet] = useState(0);
  const [Limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedGeneration, setSelectedGeneration] = useState(0);

  const types = [
    "normal",
    "fighting",
    "flying",
    "poison",
    "ground",
    "rock",
    "bug",
    "ghost",
    "steel",
    "fire",
    "water",
    "grass",
    "electric",
    "psychic",
    "ice",
    "dragon",
    "dark",
    "fairy",
  ];

  useEffect(() => {
    async function LoadData() {
      setLoading(true);
      const data = await getPokemonList(Limit, offset);

      const pokemonsDetails = await Promise.all(
        data.results.map(async (pokemon: BasicPokemon) => {
          const dataDetails = await getPokemonDetails(pokemon.url);
          return transformPokemonData(dataDetails);
        }),
      );
      setPokemons(pokemonsDetails);
      setLoading(false);
      setError("");
    }
    LoadData();
  }, [offset, Limit]);

  const handleNextPage = () => {
    setOffSet(offset + Limit);
  };

  const handleBackPage = () => {
    if (offset === 0) {
      alert("ya llegaste al primer pokemon");
    } else {
      setOffSet(offset - Limit);
    }
  };

  const LoadmorePokemons = () => {
    if (Limit < 100) {
      setLimit(Limit + 20);
    } else {
      alert("no puedes traer mas de 100 pokemons");
    }
  };

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

  const handleType = (type: string) => {
    async function filterType() {
      try {
        setLoading(true);
        const typePokemon: pokemonsTypeResponse = await getpokemonsType(type);

        const respuesta = await Promise.all(
          typePokemon.pokemon.map(async (pokemon: PokemonByType) => {
            let dataDetails = await getPokemonDetails(pokemon.pokemon.url);
            if (!dataDetails) {
              throw new Error("ERROR AL ENCONTRAR POKEMOS DEL TIPO");
            }
            return transformPokemonData(dataDetails);
          }),
        );
        setPokemons(respuesta);
        setSelectedType(type);
        setError("");
      } catch {
        setError("ERROR TRAYENDO POKEMONS POR TIPO");
      } finally {
        setLoading(false);
      }
    }

    filterType();
  };

  const handleGeneration = (generation: number) => {
    async function filterGeneration(generation: number) {
      try {
        setLoading(true);
        const generationPokemon = await getPokemonsByGeneration(generation);
        console.log(generationPokemon);
        const respuesta = await Promise.all(
          generationPokemon.pokemon_species.map(async (pokemon) => {
            const dataDetailsById = await getPokemonById(
              Number(pokemon.url.split("/")[6]),
            );
            if (!dataDetailsById) {
              throw new Error("ERROR AL ENCONTRAR POKEMOS DE LA GENERACION");
            }
            return transformPokemonData(dataDetailsById);
          }),
        );
        setPokemons(respuesta);
        setSelectedGeneration(generation);
        setError("");
      } catch {
        setError("ERROR TRAYENDO POKEMONS POR GENERACION");
      } finally {
        setLoading(false);
      }
    }
    filterGeneration(generation);
  };

  return (
    <>
      <NavBar />
      <section className="pokedex">
        <header className="pokedex-header">
          <div className="hud-line-horizontal"></div>
          <section className="pokedex-header__left">
            {/* LOGO */}
            <div className="pokedex-logo">
              <img
                src="/icons/pokeball-pokemon-svgrepo-com.svg"
                alt="Pokeball"
              />
            </div>

            {/* TITLE */}
            <article className="pokedex-header__content">
              <h1 className="pokedex-title">POKÉDEX</h1>

              <span className="pokedex-subtitle">
                NATIONAL POKÉMON DATABASE
              </span>

              <p className="pokedex-description">
                Search, filter and explore every Pokémon ever discovered.
              </p>
            </article>
          </section>

          {/* STATUS */}
          <aside className="pokedex-status">
            <div>
              <span className="pokedex-status__label">DATABASE STATUS</span>

              <div className="pokedex-status__online">ONLINE</div>
            </div>

            <div>
              <span className="pokedex-status__label">RECORDS AVAILABLE</span>

              <div className="pokedex-status__number">1025</div>
            </div>
          </aside>
        </header>

        <section className="pokedex-search-panel">
          <div className="search-corner search-corner--tl"></div>
          <div className="search-corner search-corner--tr"></div>
          <div className="search-corner search-corner--bl"></div>
          <div className="search-corner search-corner--br"></div>

          <div className="pokedex-search-panel__inner">
            <SearchBar handleSearch={handleSearch} />
          </div>
        </section>

        <FilterPanel
          types={types}
          selectedType={selectedType}
          selectedGeneration={selectedGeneration}
          handleType={handleType}
          handleGeneration={handleGeneration}
        />

        {loading && <Loader />}

        {error && <ErrorMessage error={error} />}

        {!loading && !error && <PokemonGrid pokemons={pokemons} />}

        {selectedType === "all" &&
          selectedGeneration === 0 &&
          pokemons.length > 1 && (
            <DatabaseNavigation
              handleNextPage={handleNextPage}
              handleBackPage={handleBackPage}
              loadMorePokemons={LoadmorePokemons}
              limit={Limit}
              offset={offset}
            />
          )}
      </section>
    </>
  );
}

export default Pokedex;
