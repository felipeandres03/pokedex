import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import PokemonGrid from "../components/PokemonGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import BarType from "../components/BarType";
import { useState, useEffect } from "react";
import {
  getPokemonList,
  getPokemonDetails,
  getPokemonById,
  getPokemonByName,
  getpokemonsType,
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
  const [type, setType] = useState("");

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
        setError("");
      } catch {
        setError("ERROR TRAYENDO POKEMONS POR TIPO");
      } finally {
        setLoading(false);
      }
    }

    filterType();
  };

  return (
    <>
      <div className="container-grid-pokedex">
        <SearchBar handleSearch={handleSearch} />
        <BarType
          types={[
            "electric",
            "bug",
            "dragon",
            "dark",
            "rock",
            "fire",
            "ice",
            "water",
            "flying",
            "fighting",
            "ground",
            "grass",
            "steel",
            "poison",
            "ghost",
            "normal",
            "psychic",
            "fairy",
          ]}
          handleType={handleType}
        />

        {loading && <Loader />}

        {error && <ErrorMessage error={error} />}

        {!loading && !error && <PokemonGrid pokemons={pokemons} />}

        <Pagination
          handleBackPage={handleBackPage}
          loadMorePokemons={LoadmorePokemons}
          handleNextPage={handleNextPage}
        />
      </div>
    </>
  );
}

export default Pokedex;
