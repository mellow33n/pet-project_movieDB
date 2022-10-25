import { useSelector } from "react-redux/es/exports";

import NavBar from "../../components/UI/NavBar/NavBar";
import CardList from "../../components/CardList/CardList";

function Favorites() {
  const { movies_sect, tvShow_sect } = useSelector((data) => data);

  return (
    <>
      <NavBar />
      <section className="card-list-wrapper">
        <div className="card-list-wrapper-media">
          <h3>Favorites movies</h3>
          <CardList
            cards={movies_sect.favoritesMovies}
            dataFrom="movie"
          ></CardList>
        </div>
        <div className="card-list-wrapper-media">
          <h3>Favorites tv-shows</h3>
          <CardList
            cards={tvShow_sect.favoritesTvShows}
            dataFrom="tv"
          ></CardList>
        </div>
      </section>
    </>
  );
}

export default Favorites;
