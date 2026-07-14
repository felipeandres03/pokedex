import ScrollableFilterRow from "./ScrollBar";

type Props = {
  selectedGeneration: number;
  handleGeneration: (generation: number) => void;
};

const generations = [
  { id: 1, icon: `/icons/Kanto-icon.svg`, name: "Kanto" },
  { id: 2, icon: "/icons/Johto-icon.svg", name: "Johto" },
  { id: 3, icon: "/icons/Hoenn-icon.svg", name: "Hoenn" },
  { id: 4, icon: "/icons/Sinnoh-icon.svg", name: "Sinnoh" },
  { id: 5, icon: "/icons/Unova-icon.svg", name: "Unova" },
  { id: 6, icon: "/icons/Kalos-icon.svg", name: "Kalos" },
  { id: 7, icon: "/icons/Alola-icon.svg", name: "Alola" },
  { id: 8, icon: "/icons/Galar-icon.svg", name: "Galar" },
  { id: 9, icon: "/icons/Paldea-icon.svg", name: "Paldea" },
];

function GenerationFilter({ selectedGeneration, handleGeneration }: Props) {
  return (
    <ScrollableFilterRow trackClassName="generation-filter">
      {generations.map((generation) => (
        <button
          key={generation.id}
          className={`generation-filter__button ${
            selectedGeneration === generation.id ? "active-filter" : ""
          }`}
          onClick={() => handleGeneration(generation.id)}
          title={generation.name}
        >
          <img
            src={`${import.meta.env.BASE_URL}/${generation.icon}`}
            alt={generation.name}
          />
        </button>
      ))}
    </ScrollableFilterRow>
  );
}

export default GenerationFilter;
