import "../MovieInfo/MovieInfo.scss";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";

import NavBar from "../../components/UI/NavBar/NavBar";
import {
  getTvShowCardInfoFetch,
  addToFavoritesTvShows,
} from "../../components/Store/Reducers/moviesSlice";

function TvShowInfo() {
  const { tvShow_sect } = useSelector((data) => data);
  const card_id = (window.location.pathname + "").replace(/[^0-9]/g, "");
  const dispatch = useDispatch();

  function handleFavorites(card) {
    dispatch(addToFavoritesTvShows(card));
  }

  useEffect(() => {
    dispatch(getTvShowCardInfoFetch(card_id));
  }, [card_id, dispatch]);

  return (
    <>
      <NavBar />
      <section className="card-info">
        <div className="left">
          <img
            src={
              "https://image.tmdb.org/t/p/w500" +
              tvShow_sect.tvShow_card.poster_path
            }
            alt={tvShow_sect.tvShow_card.title + " poster"}
          />
        </div>
        <div className="right">
          <div className="right-bar">
            <div className="right-bar-score">
              <p>
                {"score: " + tvShow_sect.tvShow_card.vote_average + " / 10"}{" "}
              </p>
              <p>{"of " + tvShow_sect.tvShow_card.vote_count + " votes"}</p>
            </div>
            <Button
              color="warning"
              startIcon={
                tvShow_sect.tvShow_card.isFavorites ? (
                  <GradeRoundedIcon />
                ) : (
                  <GradeOutlinedIcon />
                )
              }
              onClick={() => {
                handleFavorites(tvShow_sect.tvShow_card);
              }}
            ></Button>
          </div>
          <div className="right-tittle">
            <h3 className="right-tittle-name">
              {tvShow_sect.tvShow_card.title}
            </h3>
            <h5 className="right-title-sub">
              {tvShow_sect.tvShow_card.original_title}
            </h5>
            <p>{tvShow_sect.tvShow_card.release_date}</p>
            <p>{tvShow_sect.tvShow_card.tagline}</p>
            <p>{tvShow_sect.tvShow_card.status}</p>
          </div>

          <h5 className="right-title-sub">Overview</h5>
          <p className="right-overview">{tvShow_sect.tvShow_card.overview}</p>
          <div className="right-info">
            <div className="right-info-genres">
              <h5 className="right-title-sub">Genres</h5>
              {tvShow_sect.tvShow_card.genres ? (
                tvShow_sect.tvShow_card.genres.map((value, i) => (
                  <p key={i}>{value.name}</p>
                ))
              ) : (
                <p></p>
              )}
            </div>
            <div className="right-info-companies">
              <h5 className="right-title-sub">Production companies</h5>
              {tvShow_sect.tvShow_card.production_companies ? (
                tvShow_sect.tvShow_card.production_companies.map((value, i) => (
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

export default TvShowInfo;
