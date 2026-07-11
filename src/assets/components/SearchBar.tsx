import { useState } from "react";

type Props = {
  handleSearch: (data: string) => void;
};

function SearchBar({ handleSearch }: Props) {
  const [inputValue, setInputValue] = useState("");

  let imput = document.getElementById("input-search-pokemon");

  imput?.addEventListener("input", (usuario: any) => {
    setInputValue(usuario.target.value);
  });

  return (
    <form
      className="searchbar"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(inputValue);
      }}
    >
      <input
        className="searchbar__input"
        type="text"
        placeholder="Search Pokémon by name or id"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="searchbar__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
