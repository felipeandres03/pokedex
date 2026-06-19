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
  const [primaryTypeTeam, setPrimaryTypeTeam] = useState("poison");

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

  const onAddToTeam = (pokemon: PokemonCardFavorites) => {
    setTeam((prev) => {
      const empityIndex = prev.findIndex((slot) => slot === null);
      if (empityIndex === -1) {
        return prev;
      }

      const isAlreadyInTeam =
        prev.findIndex((slot) => slot?.id === pokemon.id) !== -1;
      if (isAlreadyInTeam) {
        return prev;
      }
      const newTeam = [...prev];
      newTeam[empityIndex] = pokemon;
      return newTeam;
    });
  };

  const onRemoveFromTeam = (id: number) => {
    const isInTeam = team.findIndex((slot) => slot?.id === id);
    if (isInTeam !== -1) {
      setTeam((prev) => {
        const newteam = [...prev];
        newteam[isInTeam] = null;
        return newteam;
      });
    }
  };

  return (
    <>
      <main className={`favorites-page  backgraund-type-${primaryTypeTeam}`}>
        <HeroFavorites primaryType={primaryTypeTeam} />
        <StatsTeam
          favorites={favorites.length}
          powerTeam={1000}
          primaryType={primaryTypeTeam}
        />
        <TeamPokemon team={team} onRemoveFromTeam={onRemoveFromTeam} />
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
        <PokemonGridFavorites
          pokemons={pokemons}
          viewMode={viewMode}
          addToTeam={onAddToTeam}
        />
      </main>
    </>
  );
}

export default Favorites;
