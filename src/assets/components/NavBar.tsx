import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <span> Pokedex</span>
      </div>

      <nav className="navbar__links">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/pokedex">Pokedex</NavLink>

        <NavLink to="/favorites">Favorites</NavLink>
      </nav>

      <div className="navbar__actions">
        <button>⚡</button>
      </div>
    </header>
  );
}

export default NavBar;
