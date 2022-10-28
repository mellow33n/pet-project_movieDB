import "./MovieInfo.scss";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";


import {
  addToFavoritesMovies,
  getMovieCardInfoFetch,
} from "../../components/Store/Reducers/moviesSlice";

function MovieInfo() {
  const { movies_sect } = useSelector((data) => data);
  const card_id = (window.location.pathname + "").replace(/[^0-9]/g, "");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieCardInfoFetch(card_id));
  }, [card_id, dispatch]);

  function handleFavorites(card) {
    dispatch(addToFavoritesMovies(card));
  }

  return (
    <>
      
      <section className="card-info">
        <div className="left">
          <img
            src={
              "https://image.tmdb.org/t/p/w500" +
              movies_sect.movie_card.poster_path
            }
            alt={movies_sect.movie_card.title + " poster"}
          />
        </div>

        <div className="right">
          <div className="right-bar">
            <div className="right-bar-score">
              <p>
                {"score: " + movies_sect.movie_card.vote_average + " / 10"}{" "}
              </p>
              <p>{"of " + movies_sect.movie_card.vote_count + " votes"}</p>
            </div>
            <Button
              color="warning"
              startIcon={
                movies_sect.movie_card.isFavorites ? (
                  <GradeRoundedIcon />
                ) : (
                  <GradeOutlinedIcon />
                )
              }
              onClick={() => {
                handleFavorites(movies_sect.movie_card);
              }}
            ></Button>
          </div>
          <div className="right-tittle">
            <h3 className="right-tittle-name">
              {movies_sect.movie_card.title}
            </h3>
            <h5 className="right-title-sub">
              {movies_sect.movie_card.original_title}
            </h5>
            <p>{movies_sect.movie_card.release_date}</p>
            <p>{movies_sect.movie_card.tagline}</p>
            <p>{movies_sect.movie_card.status}</p>
          </div>

          <h5 className="right-title-sub">Overview</h5>
          <p className="right-overview">{movies_sect.movie_card.overview}</p>
          <div className="right-info">
            <div className="right-info-genres">
              <h5 className="right-title-sub">Genres</h5>
              {movies_sect.movie_card.genres ? (
                movies_sect.movie_card.genres.map((value, i) => (
                  <p key={i}>{value.name}</p>
                ))
              ) : (
                <p></p>
              )}
            </div>
            <div className="right-info-companies">
              <h5 className="right-title-sub">Production companies</h5>
              {movies_sect.movie_card.production_companies ? (
                movies_sect.movie_card.production_companies.map((value, i) => (
                  <p key={i}>{value.name}</p>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MovieInfo;
