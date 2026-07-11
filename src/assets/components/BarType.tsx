import ScrollableFilterRow from "./ScrollBar";

type Props = {
  types: string[];
  selectedType: string;
  handleType: (type: string) => void;
};

function BarType({ types, selectedType, handleType }: Props) {
  return (
    <ScrollableFilterRow trackClassName="type-filter">
      <button
        className={`type-filter__button ${
          selectedType === "all" ? "active-filter" : ""
        }`}
        onClick={() => handleType("all")}
        title="All"
      >
        <img src="/icons/pokeball-pokemon-svgrepo-com.svg" alt="All" />
      </button>

      {types.map((type) => (
        <button
          key={type}
          className={`type-filter__button type--${type} ${
            selectedType === type ? "active-filter" : ""
          }`}
          onClick={() => handleType(type)}
          title={type}
        >
          <img src={`/icons/${type}-icon.svg`} alt={type} />
        </button>
      ))}
    </ScrollableFilterRow>
  );
}

export default BarType;
