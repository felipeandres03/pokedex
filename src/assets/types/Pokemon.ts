export type BasicResponseAPI = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BasicPokemon[];
};

export type BasicPokemon = {
  name: string;
  url: string;
};

export type PokemonCardData = {
  id: number;
  name: string;
  image: string;
  types: string[];
};

export type ResponseDetailsPokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

export type PokemonDetailsResponse = {
  id: number;
  name: string;

  height: number;
  weight: number;

  sprites: {
    front_default: string;
    front_shiny: string;

    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };

  types: {
    type: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
  }[];

  stats: {
    base_stat: number;

    stat: {
      name: string;
    };
  }[];
};

export type PokemonDetailsData = {
  id: number;
  name: string;

  image: string;
  shinyImage: string;

  types: string[];

  abilities: string[];

  height: number;
  weight: number;

  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
};

export type PokemonByType = {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
};

export type pokemonsTypeResponse = {
  id: number;
  name: string;
  pokemon: PokemonByType[];
};

export type PokemonCardFavorites = {
  name: string;
  id: number;
  image: string;
  types: string[];
  power: number;
};

export type teamSlot = PokemonCardFavorites | null;
