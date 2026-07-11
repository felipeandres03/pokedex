import BarType from "./BarType";
import GenerationFilter from "./GenerationFilter";

type Props = {
  types: string[];
  selectedType: string;
  selectedGeneration: number;
  handleType: (type: string) => void;
  handleGeneration: (generation: number) => void;
};

function FilterPanel({
  types,
  selectedType,
  selectedGeneration,
  handleType,
  handleGeneration,
}: Props) {
  return (
    <section className="filter-panel">
      <div className="filter-panel__row">
        <div className="filter-panel__title">
          <img src="icons/type-icon.svg" />
          <span>Filter by Type</span>
        </div>

        <div className="filter-panel__content">
          <BarType
            types={types}
            selectedType={selectedType}
            handleType={handleType}
          />
        </div>
      </div>

      <div className="filter-panel__divider"></div>

      <div className="filter-panel__row">
        <div className="filter-panel__title">
          <img src="icons/generation-icon.svg" />
          <span>Generation</span>
        </div>

        <div className="filter-panel__content">
          <GenerationFilter
            selectedGeneration={selectedGeneration}
            handleGeneration={handleGeneration}
          />
        </div>
      </div>
    </section>
  );
}

export default FilterPanel;
