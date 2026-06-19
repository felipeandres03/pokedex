type HeroFavoritesProps = {
  primaryType: string;
};

function HeroFavorites({ primaryType }: HeroFavoritesProps) {
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
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10035.png"
            alt="Charizard Mega Y"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroFavorites;
