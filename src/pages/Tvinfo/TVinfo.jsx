import { useEffect, useState } from "react";
import NavBar from "../../components/UI/NavBar/NavBar";
import { getTvShowCardInfo } from "../../api/moviedb";
import "../MovieInfo/MovieInfo.scss";

function TvShowInfo() {
  const card_id = (window.location.pathname + "").replace(/[^0-9]/g, "");
  const [cardInfo, setCardInfo] = useState({});

  useEffect(() => {
    getTvShowCardInfo(card_id).then((res) => setCardInfo(res.data));
  }, [card_id]);

  return (
    <>
      <NavBar />
      <section className="card-info">
        <div className="left">
          <img
            src={"https://image.tmdb.org/t/p/w500" + cardInfo.poster_path}
            alt={cardInfo.title + " poster"}
          />
        </div>
        <div className="right">
            <div className="right-bar">
                <div className="right-bar-score">
                    <p>{'score: ' + cardInfo.vote_average + ' / 10'} </p>
                    <p>{'of ' + cardInfo.vote_count + ' votes'}</p>

                </div>
            </div>
          <div className="right-tittle">
            <h3 className="right-tittle-name">{cardInfo.title}</h3>
            <h5 className="right-title-sub">{cardInfo.original_title}</h5>
            <p>{cardInfo.release_date}</p>
            <p>{cardInfo.tagline}</p>
            <p>{cardInfo.status}</p>
          </div>

          <h5 className="right-title-sub">Overview</h5>
          <p className="right-overview">{cardInfo.overview}</p>
          <div className="right-info">
            <div className="right-info-genres">
              <h5 className="right-title-sub">Genres</h5>
              {cardInfo.genres ? (
                cardInfo.genres.map((value, i) => <p key={i}>{value.name}</p>)
              ) : (
                <p></p>
              )}
            </div>
            <div className="right-info-companies">
              <h5 className="right-title-sub">Production companies</h5>
              {cardInfo.production_companies ? (
                cardInfo.production_companies.map((value, i) => (
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
