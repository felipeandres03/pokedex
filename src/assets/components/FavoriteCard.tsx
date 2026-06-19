import { PokemonCardFavorites } from "../types/Pokemon";

type Props = {
  pokemon: PokemonCardFavorites;
  viewMode: "grid" | "list";
  addToTeam: (pokemon: PokemonCardFavorites) => void;
};

function FavoriteCard({ pokemon, viewMode, addToTeam }: Props) {
  return (
    <article
      className={`
        favorite-card
        favorite-card--${viewMode}
        pokemon-card__type---${pokemon.types[0]}`}
    >
      <div className="favorite-card__image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      <div className="favorite-card__content">
        <span className="favorite-card__id">
          #{pokemon.id.toString().padStart(4, "0")}
        </span>

        <h3 className="favorite-card__name">{pokemon.name}</h3>

        <div className="favorite-card__types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`type-badge pokemon-card__type pokemon-card__type--${type}`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="favorite-card__power">
          <span>Team Power</span>
          <strong>{pokemon.power}</strong>
        </div>

        <div className="favorite-card__actions">
          <button className="btn-add-team" onClick={() => addToTeam(pokemon)}>
            Add Team
          </button>

          <button className="btn-remove-team">Remove</button>
        </div>
      </div>
    </article>
  );
}

export default FavoriteCard;
