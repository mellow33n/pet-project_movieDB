import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { AUTH_TOKEN } from "../../../config/config";
import SearchBar from "./Search/Search";

function NavBar() {
  return (
    <nav className="nav">
      <div className="nav-line-first">
        <NavLink to="/login">
          <Button variant="contained" color="primary">
            {AUTH_TOKEN ? "Log out" : "Log in"}
          </Button>
        </NavLink>
      </div>
      <div className="nav-line-second">
        <NavLink to="/">
          <Button variant="contained">Homepage</Button>
        </NavLink>

        <NavLink to="/movies">
          <Button variant="contained">Movies</Button>
        </NavLink>

        <NavLink to="/tv-shows">
          <Button variant="contained">TV-Shows</Button>
        </NavLink>

        <NavLink to="/favorites">
          <Button variant="contained">Favorites</Button>
        </NavLink>
        
      </div>
      <div className="nav-line-third">
        <SearchBar></SearchBar>
      </div>
    </nav>
  );
}

export default NavBar;
