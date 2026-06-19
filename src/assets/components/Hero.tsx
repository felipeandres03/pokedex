import SearchBar from "./SearchBar";

type Props = {
  handleSearch: (searchValue: string) => void;
};

function Hero({ handleSearch }: Props) {
  return (
    <section className="hero container">
      {/* LEFT CONTENT */}
      <article className="hero__content">
        <span className="hero__tag">NEXT GENERATION POKEDEX</span>

        <h1 className="hero__title">
          Discover Every <span className="hero__pokemon">Pokémon</span>
        </h1>

        <p className="hero__description">
          Explore stats, abilities, shiny forms and battle data in a futuristic
          Pokédex experience.
        </p>

        <SearchBar handleSearch={handleSearch} />
      </article>

      {/* RIGHT CONTENT */}
      <article className="hero__image">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/644.png`}
          alt="Pokemon"
        />
      </article>
    </section>
  );
}

export default Hero;
