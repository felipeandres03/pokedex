type HeroFavoritesProps = {
  primaryType: string | null;
};

function HeroFavorites({ primaryType }: HeroFavoritesProps) {
  const pokemonsHero = [
    { type: "fire", id: 10035 },
    { type: "water", id: 382 },
    { type: "grass", id: 10065 },
    { type: "electric", id: 10304 },
    { type: "psychic", id: 150 },
    { type: "ice", id: 646 },
    { type: "dragon", id: 10079 },
    { type: "dark", id: 491 },
    { type: "fairy", id: 716 },
    { type: "fighting", id: 10059 },
    { type: "flying", id: 641 },
    { type: "ghost", id: 10007 },
    { type: "ground", id: 10078 },
    { type: "poison", id: 804 },
    { type: "rock", id: 10049 },
    { type: "steel", id: 10076 },
    { type: "bug", id: 10090 },
    { type: "normal", id: 493 },
  ];

  return (
    <section className={`favorites-hero background-hero-type-${primaryType}`}>
      <div className="favorites-hero__overlay"></div>

      <div className="container favorites-hero__container">
        <div className="favorites-hero__content">
          <span className="favorites-hero__tag">FAVORITE COLLECTION</span>

          <h1 className="favorites-hero__title">
            Build Your
            <span> Ultimate Team</span>
          </h1>

          <p className="favorites-hero__description">
            Save your favorite Pokémon and create the perfect legendary squad
            for battle.
          </p>
        </div>

        <div className="favorites-hero__image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonsHero.find((p) => p.type === primaryType)?.id || 10018}.png`}
            alt="Charizard Mega Y"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroFavorites;
