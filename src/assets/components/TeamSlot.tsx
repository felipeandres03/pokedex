import { PokemonCardFavorites } from "../types/Pokemon";

interface TeamSlotProps {
  pokemon: PokemonCardFavorites | null;
  onRemove?: (id: number) => void;
  slotNumber: number;
}

function TeamSlot({ pokemon, onRemove, slotNumber }: TeamSlotProps) {
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
    </article>
  );
}

export default TeamSlot;
