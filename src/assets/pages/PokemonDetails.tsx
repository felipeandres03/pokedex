import { useEffect, useState } from "react";
import { getPokemonFullDetails } from "../services/pokemonApi";
import { PokemonDetailsData } from "../types/Pokemon";
import { useParams } from "react-router-dom";
import { transformPokemonDetailsData } from "../services/transformers";
import Loader from "../components/Loader";
import PokemonCardDetails from "../components/PokemonCardDetails";

function PokemonDetails() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<PokemonDetailsData>();

  useEffect(() => {
    async function loadData() {
      const data = await getPokemonFullDetails(Number(id));
      setPokemon(transformPokemonDetailsData(data));
    }

    loadData();
  }, []);

  const cardInfo = pokemon ? (
    <PokemonCardDetails pokemon={pokemon} />
  ) : (
    <Loader />
  );
  return <>{cardInfo}</>;
}

export default PokemonDetails;
