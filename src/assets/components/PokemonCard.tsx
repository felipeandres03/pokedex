import { PokemonCardData } from "../types/Pokemon";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

type Props = {
  pokemon: PokemonCardData;
};

function PokemonCard({ pokemon }: Props) {
  const navigate = useNavigate();

  const { addFavorites, removeFavorites, isFavorites } = useFavorites();

  return (
    <article
      className={`pokemon-card pokemon-card--${pokemon.types[0]}`}
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      {/* Fondo decorativo */}
      <div className="pokemon-card__background" />

      {/* Pokeball gigante */}
      <div className="pokemon-card__pokeball" />

      <div className="pokemon-card__wrapper">
        {/* HEADER */}

        <div className="pokemon-card__top">
          <span className="pokemon-card__id">
            #{pokemon.id.toString().padStart(4, "0")}
          </span>

          <button
            className={`pokemon-card__favorite ${
              isFavorites(pokemon.id) ? "active-favorites" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();

              isFavorites(pokemon.id)
                ? removeFavorites(pokemon.id)
                : addFavorites(pokemon.id);
            }}
          >
            <img
              className="favorite-icon"
              src={`${import.meta.env.BASE_URL}/icons/pokeball-pokemon-svgrepo-com.svg`}
              alt="Favorite"
            />
          </button>
        </div>

        {/* IMAGE */}

        <div className="pokemon-card__image">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>

        {/* CONTENT */}

        <div className="pokemon-card__content">
          <h2 className="pokemon-card__title">{pokemon.name}</h2>

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
      </div>
    </article>
  );
}

export default PokemonCard;
