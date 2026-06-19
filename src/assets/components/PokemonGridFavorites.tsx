import { PokemonCardFavorites } from "../types/Pokemon";
import FavoriteCard from "./FavoriteCard";

type Props = {
  pokemons: PokemonCardFavorites[];
  viewMode: "grid" | "list";
  addToTeam: (pokemon: PokemonCardFavorites) => void;
};

function PokemonGridFavorites({ pokemons, viewMode, addToTeam }: Props) {
  return (
    <section className={`favorites-${viewMode}-section container`}>
      <div
        className={viewMode === "grid" ? "favorites-grid" : "favorites-list"}
      >
        {pokemons.map((pokemon) => (
          <FavoriteCard
            key={pokemon.id}
            pokemon={pokemon}
            viewMode={viewMode}
            addToTeam={addToTeam}
          />
        ))}
      </div>
    </section>
  );
}

export default PokemonGridFavorites;
