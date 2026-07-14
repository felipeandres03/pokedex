import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__logo">
        <img
          src={`${import.meta.env.BASE_URL}/icons/pokeball-pokemon-svgrepo-com.svg`}
        />
        Pokedex
      </NavLink>

      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/pokedex">Pokedex</NavLink>

        <NavLink to="/favorites">Favorites</NavLink>
      </nav>

      <div className="navbar__actions">
        <button>
          <img
            src={`${import.meta.env.BASE_URL}/icons/pokeball-pokemon-svgrepo-com.svg`}
            alt="icon"
          />
        </button>
      </div>
    </header>
  );
}

export default NavBar;
