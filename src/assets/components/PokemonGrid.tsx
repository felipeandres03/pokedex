import PokemonCard from "./PokemonCard";
import { PokemonCardData } from "../types/Pokemon";

type Props = {
  pokemons: PokemonCardData[];
};

function PokemonGrid({ pokemons }: Props) {
  return (
    <section className="pokemon-grid container-grid">
      {pokemons.map((pokemon) => {
        return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
      })}
    </section>
  );
}

export default PokemonGrid;
