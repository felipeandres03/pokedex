import { PokemonCardData } from "../types/Pokemon";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

type Props = {
  pokemon: PokemonCardData;
};

function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();

  const { addFavorites, isFavorites, removeFavorites } = useFavorites();

  return (
    <article
      className={`pokemon-card  pokemon-card--${pokemon.types[0]} `}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      {/*particulas */}
      <div className="pokemon-card__particles"></div>

      {/* TOP */}
      <div className="pokemon-card__top">
        <span className="pokemon-card__id">#{pokemon.id}</span>

        <button
          className={`pokemon-card__favorite ${isFavorites(pokemon.id) ? "active-favorites" : ""}`}
          onClick={() => {
            isFavorites(pokemon.id)
              ? removeFavorites(pokemon.id)
              : addFavorites(pokemon.id);
          }}
        >
          <img
            className="favorite-icon"
            src="/icons/pokeball-pokemon-svgrepo-com.svg"
            alt="pokebola"
          />
        </button>
      </div>

      {/* IMAGE */}
      <div className="pokemon-card__image">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>

      {/* INFO */}
      <div className="pokemon-card__content">
        <h2 className="pokemon-card__title">{pokemon.name}</h2>

        {/* TYPES */}
        <div className="pokemon-card__types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`pokemon-card__type pokemon-card__type--${type}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default PokemonCard;
