import {
  BasicResponseAPI,
  PokemonDetailsResponse,
  ResponseDetailsPokemon,
} from "../types/Pokemon";

const urlBase = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  limit: number,
  offset: number,
): Promise<BasicResponseAPI> {
  const respuesta = await fetch(
    `${urlBase}/pokemon?limit=${limit}/&offset=${offset}`,
  );

  if (!respuesta.ok) {
    throw new Error("ERROR AL OBTENER LISTA");
  }
  return await respuesta.json();
}

export async function getPokemonById(
  id: number,
): Promise<ResponseDetailsPokemon | null> {
  const respuesta = await fetch(`${urlBase}/pokemon/${id}`);
  if (!respuesta.ok) {
    return null;
  }

  return await respuesta.json();
}

export async function getPokemonByName(
  name: string,
): Promise<ResponseDetailsPokemon | null> {
  const respuesta = await fetch(`${urlBase}/pokemon/${name}`);
  if (!respuesta.ok) {
    return null;
  }

  return await respuesta.json();
}

export async function getPokemonDetails(
  url: string,
): Promise<ResponseDetailsPokemon> {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw Error("ERROR OBTENIENDO DETALLES DEL POKEMON");
  }

  return await respuesta.json();
}

export async function getPokemonFullDetails(
  id: number,
): Promise<PokemonDetailsResponse> {
  const respuesta = await fetch(`${urlBase}/pokemon/${id}`);
  if (!respuesta.ok) {
    throw Error("ERROR OBTENIENDO TODOS LOS DETALLES DEL POKEMON");
  }

  return await respuesta.json();
}

export async function getpokemonsType(type: string) {
  const respuesta = await fetch(`${urlBase}/type/${type}`);
  if (!respuesta.ok) {
    throw new Error(`ERROR OBTENIENDO POKEMONS TIPO ${type}`);
  }

  return await respuesta.json();
}
