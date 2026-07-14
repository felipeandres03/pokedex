import HeroFavorites from "../components/HeroFavorites";
import NavBar from "../components/NavBar";
import StatsTeam from "../components/StatsTeam";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
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
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState<teamSlot[]>(Array(8).fill(null));
  const [powerBattleTeam, setPowerBattleTeam] = useState(0);

  useEffect(() => {
    async function loadPokemonsFavorites() {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }

    loadPokemonsFavorites();
  }, [favorites]);

  function getPrimaryType() {
    const validPokemons = team.filter(
      (pokemon): pokemon is PokemonCardFavorites => pokemon !== null,
    );

    if (validPokemons.length === 0) {
      return null;
    }

    const typeCount: Record<string, number> = {};

    validPokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });

    let primaryType = "normal";
    let maxCount = 0;

    Object.entries(typeCount).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        primaryType = type;
      }
    });

    return primaryType;
  }

  const primaryType = getPrimaryType();

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
      setPowerBattleTeam(powerBattleTeam + pokemon.power);
      return newTeam;
    });
  };

  const onRemoveFromTeam = (id: number) => {
    const isInTeam = team.findIndex((slot) => slot?.id === id);
    if (isInTeam !== -1) {
      team[isInTeam]?.power === undefined
        ? null
        : setPowerBattleTeam(powerBattleTeam - team[isInTeam]?.power);
      setTeam((prev) => {
        const newteam = [...prev];
        newteam[isInTeam] = null;
        return newteam;
      });
    }
  };

  return (
    <>
      <NavBar />
      <main
        className={`favorites-page  backgraund-type-${primaryType === null ? "normal" : primaryType}`}
      >
        <HeroFavorites
          primaryType={primaryType === null ? "normal" : primaryType}
        />
        <StatsTeam
          favorites={favorites.length}
          powerTeam={powerBattleTeam}
          primaryType={primaryType === null ? "normal" : primaryType}
        />
        <TeamPokemon team={team} onRemoveFromTeam={onRemoveFromTeam} />
        <section className="container favorites-selec-grid">
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

        {loading && <Loader />}

        {error && <ErrorMessage error={error} />}

        {!loading && !error && (
          <PokemonGridFavorites
            pokemons={pokemons}
            viewMode={viewMode}
            addToTeam={onAddToTeam}
          />
        )}
      </main>
    </>
  );
}

export default Favorites;
