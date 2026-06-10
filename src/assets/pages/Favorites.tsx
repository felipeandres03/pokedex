import HeroFavorites from "../components/HeroFavorites";
import StatsTeam from "../components/StatsTeam";
import TeamPokemon from "../components/TeamPokemon";
import PokemonGridFavorites from "../components/PokemonGridFavorites";
import { transformPokemonFavorites } from "../services/transformers";
import { useFavorites } from "../context/FavoritesContext";
import { PokemonCardFavorites } from "../types/Pokemon";
import { useEffect, useState } from "react";
import { getPokemonFullDetails } from "../services/pokemonApi";

function Favorites() {
  const { favorites } = useFavorites();
  const [pokemons, setPokemons] = useState<PokemonCardFavorites[]>([]);
  const [viewMode, setVieawMode] = useState("list");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPokemonsFavorites() {
      try {
        const data = await Promise.all(
          favorites.map(async (id) => {
            const pokemon = await getPokemonFullDetails(id);
            if (!pokemon) {
              throw new Error("pokemon no encontrado");
            }
            return transformPokemonFavorites(pokemon);
          }),
        );
        setPokemons(data);
      } catch {
        setError("ERRO CARGANDO POKEMONS");
      }
    }

    loadPokemonsFavorites();
  }, [favorites]);

  return (
    <>
      <main className="favorites-page">
        <HeroFavorites />
        <StatsTeam
          favorites={favorites.length}
          powerTeam={1000}
          primaryType={"fire"}
        />

        <PokemonGridFavorites pokemons={pokemons} viewMode={"list"} />
      </main>
    </>
  );
}

export default Favorites;
