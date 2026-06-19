import HeroFavorites from "../components/HeroFavorites";
import StatsTeam from "../components/StatsTeam";
import TeamPokemon from "../components/TeamPokemon";
import PokemonGridFavorites from "../components/PokemonGridFavorites";
import { transformPokemonFavorites } from "../services/transformers";
import { useFavorites } from "../context/FavoritesContext";
import { PokemonCardFavorites, teamSlot } from "../types/Pokemon";
import { useEffect, useState } from "react";
import { getPokemonFullDetails } from "../services/pokemonApi";

function Favorites() {
  const { favorites } = useFavorites();
  const [pokemons, setPokemons] = useState<PokemonCardFavorites[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [error, setError] = useState("");
  const [team, setTeam] = useState<teamSlot[]>(Array(8).fill(null));

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
        <TeamPokemon team={team} />
        <section className="container">
          <div className="favorites-view">
            <button
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => {
                setViewMode("grid");
              }}
            >
              <img src="/icons/grid-icon.svg" alt="grid" />
            </button>
            <button
              className={viewMode === "list" ? "active" : ""}
              onClick={() => {
                setViewMode("list");
              }}
            >
              <img src="/icons/list-icon.svg" alt="list" />
            </button>
          </div>
        </section>
        <PokemonGridFavorites pokemons={pokemons} viewMode={viewMode} />
      </main>
    </>
  );
}

export default Favorites;
