import {
  PokemonCardData,
  ResponseDetailsPokemon,
  PokemonDetailsResponse,
  PokemonDetailsData,
  PokemonCardFavorites,
} from "../types/Pokemon";

export function transformPokemonData(
  pokemon: ResponseDetailsPokemon,
): PokemonCardData {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    types: pokemon.types.map((t) => t.type.name),
  };
}

export function transformPokemonDetailsData(
  pokemon: PokemonDetailsResponse,
): PokemonDetailsData {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    shinyImage: pokemon.sprites.front_shiny,
    types: pokemon.types.map((t) => t.type.name),
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    abilities: pokemon.abilities.map((h) => h.ability.name),
    stats: {
      hp: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
    },
  };
}

export function transformPokemonFavorites(
  pokemon: PokemonDetailsResponse,
): PokemonCardFavorites {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other["official-artwork"].front_default,
    types: pokemon.types.map((t) => t.type.name),
    power:
      pokemon.stats[0].base_stat +
      pokemon.stats[1].base_stat +
      pokemon.stats[2].base_stat +
      pokemon.stats[3].base_stat +
      pokemon.stats[4].base_stat +
      pokemon.stats[5].base_stat,
  };
}
