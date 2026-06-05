import { PokemonCardFavorites } from "../types/Pokemon";

type Props = {
  pokemon: PokemonCardFavorites;
};

function FavoriteCard({ pokemon }: Props) {
  return (
    <article
      className={`favorite-card  pokemon-card__type---${pokemon.types[0]}`}
    >
      <span className="favorite-card__id">
        #{pokemon.id.toString().padStart(4, "0")}
      </span>

      <div className="favorite-card__image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      <h3 className="favorite-card__name">{pokemon.name}</h3>

      <div className="favorite-card__types">
        {pokemon.types.map((type) => (
          <span key={type} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>

      <div className="favorite-card__power">
        <span>Team Power</span>

        <strong>{pokemon.power}</strong>
      </div>

      <div className="favorite-card__actions">
        <button className="btn-team">Add Team</button>

        <button className="btn-remove">Remove</button>
      </div>
    </article>
  );
}

export default FavoriteCard;
