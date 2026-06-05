type Props = {
  loadMorePokemons: () => void;
};

function LoadMoreButton({ loadMorePokemons }: Props) {
  return (
    <div className="container-buton">
      <button
        className="button-primary "
        onClick={() => {
          loadMorePokemons();
        }}
      >
        Load More
      </button>
    </div>
  );
}

export default LoadMoreButton;
