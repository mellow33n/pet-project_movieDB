import "./Dashboard.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { CircularProgress } from "@mui/material";

import {
  getMoviesFetch,
  getMoviesGenresFetch,
  getTvShowPopFetch,
  getTvGenresFetch,
} from "../../components/Store/Reducers/moviesSlice";
import CardList from "../../components/CardList/CardList";

function Dashboard() {
  const dispatch = useDispatch();
  const { movies_sect, tvShow_sect } = useSelector((data) => data);

  useEffect(() => {
    dispatch(getMoviesFetch());
    dispatch(getTvShowPopFetch());
    dispatch(getMoviesGenresFetch());
    dispatch(getTvGenresFetch());
  }, [dispatch]);

  return (
    <>
      <main className="main">
        <section className="bar-movies">
          <h2>Watch the movies</h2>
          <CardList
            cards={movies_sect.movies}
            dashboard={true}
            dataFrom="movie"
          >
          </CardList>
        </section>
        <section className="bar-movies">
          <h2>Watch the popular tv-shows</h2>
          <CardList
            cards={tvShow_sect.tvShow}
            dashboard={true}
            dataFrom="tv"
          >
          </CardList>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
