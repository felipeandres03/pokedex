import Pagination from "./Pagination";
import LoadMoreButton from "./LoadMoreButton";

type Props = {
  handleNextPage: () => void;
  handleBackPage: () => void;
  loadMorePokemons: () => void;
  limit: number;
  offset: number;
};

function DatabaseNavigation({
  handleNextPage,
  handleBackPage,
  loadMorePokemons,
  limit,
  offset,
}: Props) {
  const startPokemon = offset + 1;
  const endPokemon = offset + limit;

  const progress = (limit / 100) * 100;

  return (
    <section className="database-navigation">
      {/* ================= HEADER ================= */}

      <header className="database-navigation__header">
        <div className="database-navigation__title">
          <span className="database-navigation__led"></span>

          <div>
            <h3>DATABASE NAVIGATION</h3>

            <p>Control how many Pokémon are loaded and browse the database.</p>
          </div>
        </div>
      </header>

      {/* ================= BODY ================= */}

      <div className="database-navigation__body">
        {/* ==========================================
              DATABASE LOAD
        =========================================== */}

        <article className="database-navigation__load">
          <span className="database-navigation__label">DATABASE LOAD</span>

          <h2 className="database-navigation__number">
            {limit}
            <span>/100</span>
          </h2>

          <p className="database-navigation__subtitle">Loaded Pokémon</p>

          {/* Progress */}

          <div className="database-navigation__progress">
            <div
              className="database-navigation__progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Marks */}

          <div className="database-navigation__marks">
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>

          <LoadMoreButton loadMorePokemons={loadMorePokemons} />
        </article>

        {/* ==========================================
              CURRENT WINDOW
        =========================================== */}

        <article className="database-navigation__window">
          <span className="database-navigation__label">CURRENT WINDOW</span>

          <div className="database-navigation__range">
            <span>#{startPokemon}</span>

            <div className="database-navigation__range-line"></div>

            <span>#{endPokemon}</span>
          </div>

          <p className="database-navigation__subtitle">
            Showing {limit} Pokémon
          </p>

          <Pagination
            handleBackPage={handleBackPage}
            handleNextPage={handleNextPage}
          />
        </article>
      </div>
    </section>
  );
}

export default DatabaseNavigation;
