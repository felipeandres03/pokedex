type Props = {
  totalPokemons?: number;
};

function ExplorerSection({ totalPokemons = 1025 }: Props) {
  return (
    <section className="explorer-section">
      <span className="explorer-section__tag">POKÉDEX DATABASE</span>

      <h2 className="explorer-section__title">Explore Every Pokémon</h2>

      <p className="explorer-section__description">
        Browse official Pokémon data, discover every generation, inspect their
        types, abilities and build your ultimate collection.
      </p>

      <div className="explorer-section__stats">
        <article className="explorer-stat">
          <span className="explorer-stat__number">{totalPokemons}+</span>

          <span className="explorer-stat__label">Pokémon</span>
        </article>

        <article className="explorer-stat">
          <span className="explorer-stat__number">18</span>

          <span className="explorer-stat__label">Types</span>
        </article>

        <article className="explorer-stat">
          <span className="explorer-stat__number">∞</span>

          <span className="explorer-stat__label">Adventures</span>
        </article>
      </div>
      <p className="explorer-section__description">
        Explore every Pokémon, compare their stats, build your dream team and
        discover favorites.
      </p>
    </section>
  );
}

export default ExplorerSection;
