type Props = {
  loadMorePokemons: () => void;
};

function LoadMoreButton({ loadMorePokemons }: Props) {
  return (
    <div className="load-more">
      <button className="load-more__button" onClick={loadMorePokemons}>
        <span className="load-more__icon">＋</span>

        <span>LOAD 20 MORE</span>
      </button>
    </div>
  );
}

export default LoadMoreButton;
