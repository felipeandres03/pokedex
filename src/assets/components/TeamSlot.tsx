import { PokemonCardFavorites } from "../types/Pokemon";

interface TeamSlotProps {
  pokemon: PokemonCardFavorites | null;
  onRemove: (id: number) => void;
  slotNumber: number;
}

function TeamSlot({ pokemon, onRemove, slotNumber }: TeamSlotProps) {
  if (pokemon !== null) {
    return (
      <article
        className={`
    team-slot
    filled-slot
    type-${pokemon.types[0]}
  `}
      >
        <div className="slot-number">
          {slotNumber.toString().padStart(2, "0")}
        </div>

        <button className="remove-button" onClick={() => onRemove(pokemon.id)}>
          ✕
        </button>

        <div className="slot-content">
          <span className="pokemon-team-name">{pokemon.name}</span>

          <img
            className="pokemon-team-image"
            src={pokemon.image}
            alt={pokemon.name}
          />
        </div>

        <div className="slot-footer">POWER: {pokemon.power}</div>

        <div className="side-decoration-right" />
      </article>
    );
  }
  return (
    <article className="team-slot">
      <div className="slot-number">
        {slotNumber.toString().padStart(2, "0")}
      </div>

      <div className="slot-content">
        <div className="pokeball-placeholder">
          <div className="pokeball-center" />
        </div>
      </div>

      <div className="slot-footer">ESPACIO VACÍO</div>
      <div className="side-decoration-right" />
    </article>
  );
}

export default TeamSlot;
