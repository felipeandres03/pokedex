import { PokemonDetailsData } from "../types/Pokemon";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

type props = {
  pokemon: PokemonDetailsData;
};

function PokemonCardDetails({ pokemon }: props) {
  const navigate = useNavigate();
  const { addFavorites, removeFavorites, isFavorites } = useFavorites();
  const primaryType = pokemon.types[0];
  return (
    <section className={`details details--${primaryType} `}>
      {/* =========================================
          BACKGROUND LAYERS
      ========================================= */}
      <div className="details__bg-art" />
      <div className="details__bg-overlay" />

      {/* =========================================
          TOP BAR
      ========================================= */}
      <header className="details__topbar">
        <button
          className="btn btn-primary btn--medium"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <button
          className={`details__fav ${isFavorites(pokemon.id) ? "active" : ""}`}
          aria-label="Favorite"
          onClick={() => {
            if (isFavorites(pokemon.id)) {
              removeFavorites(pokemon.id);
            } else {
              addFavorites(pokemon.id);
            }
          }}
        >
          <img
            src={`/icons/pokeball-${isFavorites(pokemon.id) ? "active.svg" : "pokemon-svgrepo-com.svg"}`}
            alt="pokebola"
          />
        </button>
      </header>

      {/* =========================================
          HERO LAYOUT
      ========================================= */}
      <div className="details__layout">
        {/* =========================================
            LEFT COLUMN
        ========================================= */}
        <div className="details__left">
          {/* Big decorative number */}
          <span className="details__id-bg">
            {String(pokemon.id).padStart(3, "0")}
          </span>

          <div className="details__meta">
            <p className="details__id-label">
              #{String(pokemon.id).padStart(3, "0")}
            </p>
            <h1 className="details__name">{pokemon.name}</h1>

            <div className="details__types">
              {pokemon.types.map((type: string) => (
                <span key={type} className={`details__type type--${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            CENTER — ARTWORK
        ========================================= */}
        <div className="details__artwork">
          <div className="details__glow-ring" />
          <div className="details__moon" />
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="details__image"
          />
        </div>

        {/* =========================================
            RIGHT COLUMN — PANELS
        ========================================= */}
        <div className="details__right">
          {/* Measurements */}
          <div className="details__measurements">
            <article className="details__measurement-card">
              <span className="details__meas-icon">📏</span>
              <div>
                <span className="details__meas-label">Height</span>
                <strong className="details__meas-value">
                  {pokemon.height} m
                </strong>
              </div>
            </article>
            <article className="details__measurement-card">
              <span className="details__meas-icon">⚖️</span>
              <div>
                <span className="details__meas-label">Weight</span>
                <strong className="details__meas-value">
                  {pokemon.weight} kg
                </strong>
              </div>
            </article>
          </div>

          {/* Abilities */}
          <div className="details__panel">
            <h2 className="details__panel-title">✦ Abilities</h2>
            <div className="details__abilities">
              {pokemon.abilities.map((ability: string) => (
                <span key={ability} className="details__ability">
                  {ability}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="details__panel">
            <h2 className="details__panel-title">📊 Base Stats</h2>

            {[
              {
                label: "HP",
                value: pokemon.stats.hp,
                color: "stat--hp",
                icon: "HP-icon",
              },
              {
                label: "Attack",
                value: pokemon.stats.attack,
                color: "stat--attack",
                icon: "Attack-icon",
              },
              {
                label: "Defense",
                value: pokemon.stats.defense,
                color: "stat--defense",
                icon: "Defense-icon",
              },
              {
                label: "Speed",
                value: pokemon.stats.speed,
                color: "stat--speed",
                icon: "Speed-icon",
              },
            ].map(({ label, value, color, icon }) => (
              <div key={label} className="details__stat">
                <span className={`details__stat-icon ${color}`}>
                  <img src={`/icons/${icon}.svg`} alt={label} />
                </span>
                <span className="details__stat-label">{label}</span>
                <div className="details__bar">
                  <div
                    className={`details__progress ${color}`}
                    style={{ width: `${Math.min(value, 100)}%` }}
                  />
                </div>
                <strong className="details__stat-value">{value} / 100</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokemonCardDetails;
