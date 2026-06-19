import { PokemonCardFavorites, teamSlot } from "../types/Pokemon";
import TeamSlot from "./TeamSlot";

type TeamPokemonProps = {
  team: teamSlot[];
  onRemoveFromTeam?: (id: number) => void;
};

function TeamPokemon({ team, onRemoveFromTeam }: TeamPokemonProps) {
  return (
    <section className="team-container container">
      <div className="team-header">
        <h2>Mi Equipo</h2>

        <p>Aquí puedes ver los Pokémon que forman parte de tu equipo.</p>
      </div>

      <div className="team-grid">
        {team.map((pokemon, index) =>
          pokemon === null ? (
            <TeamSlot pokemon={null} slotNumber={index + 1} key={index} />
          ) : (
            <TeamSlot
              slotNumber={index + 1}
              key={index}
              pokemon={pokemon}
              onRemove={onRemoveFromTeam}
            />
          ),
        )}
      </div>
    </section>
  );
}

export default TeamPokemon;
