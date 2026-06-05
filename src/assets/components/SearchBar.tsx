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
    <section>
      <form
        className="searchbar"
        onSubmit={() => {
          event?.preventDefault();
          handleSearch(inputValue);
        }}
      >
        <input
          className="searchbar__input"
          id="input-search-pokemon"
          type="text"
          placeholder="Search pokemon by name or id"
        />
        <button className="searchbar__button" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchBar;
