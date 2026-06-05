type Props = {
  name: string;
  id: number;
  image: string;
  types: string[];
  power: number;
};

function TeamPokemon({ name, id, image, types, power }: Props) {
  return (
    <section>
      <article className="team-card">
        <span className="team-card__id">#{id.toString().padStart(4, "0")}</span>

        <div className="team-card__image">
          <img src={image} alt={name} />
        </div>

        <h3 className="team-card__name">{name}</h3>

        <div className="team-card__types">
          {types.map((type) => (
            <span key={type} className={`type-badge type-${type}`}>
              {type}
            </span>
          ))}
        </div>

        <div className="team-card__power">⚡ {power}</div>
      </article>
    </section>
  );
}

export default TeamPokemon;
