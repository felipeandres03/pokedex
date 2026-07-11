type Props = {
  handleNextPage: () => void;
  handleBackPage: () => void;
};

function Pagination({ handleBackPage, handleNextPage }: Props) {
  return (
    <section className="pagination">
      <button className="pagination__button" onClick={handleBackPage}>
        <span className="pagination__icon">◀</span>

        <span>Previous</span>
      </button>

      <button className="pagination__button" onClick={handleNextPage}>
        <span>Next</span>

        <span className="pagination__icon">▶</span>
      </button>
    </section>
  );
}

export default Pagination;
