type Props = {
  favorites: number;
  powerTeam: number;
  primaryType: string | null;
};

function StatsTeam({ favorites, powerTeam, primaryType }: Props) {
  return (
    <section className="stats-team">
      <article className="stats-team__card">
        <img src="/icons/heart-svgrepo-com.svg" alt="favorites icon" />

        <div className="stats-team__info">
          <span>Favorites</span>

          <strong>{favorites}</strong>
        </div>
      </article>

      <article className="stats-team__card">
        <img src={`/icons/${primaryType}-icon.svg`} alt="type icon" />

        <div className="stats-team__info">
          <span>Main Type</span>
          <strong>{primaryType}</strong>
        </div>
      </article>

      <article className="stats-team__card">
        <img
          src="/icons/sword-origami-paper-svgrepo-com.svg"
          alt="power icon"
        />

        <div className="stats-team__info">
          <span>Battle Power</span>

          <strong>{powerTeam}</strong>
        </div>
      </article>
    </section>
  );
}

export default StatsTeam;
