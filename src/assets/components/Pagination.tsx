import LoadMoreButton from "./LoadMoreButton";

type Props = {
  handleNextPage: () => void;
  handleBackPage: () => void;
  loadMorePokemons: () => void;
};

function Pagination({
  handleBackPage,
  handleNextPage,
  loadMorePokemons,
}: Props) {
  return (
    <section className="pagination container">
      <button
        className="pagination__button  button-primary"
        onClick={handleBackPage}
      >
        ← Previous
      </button>

      <LoadMoreButton loadMorePokemons={loadMorePokemons} />

      <button
        className="pagination__button  button-primary"
        onClick={handleNextPage}
      >
        Next →
      </button>
    </section>
  );
}

export default Pagination;
