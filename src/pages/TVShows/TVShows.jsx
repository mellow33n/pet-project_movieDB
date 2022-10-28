import "./Movies.scss";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";


import { getTvShowFetch } from "../../components/Store/Reducers/moviesSlice";
import CardList from "../../components/CardList/CardList";
import MoviesPagination from "../../components/UI/Pagination/Pagination";

function TvShows() {
  const dispatch = useDispatch();
  const {tvShow_sect} = useSelector((data) => data);

  useEffect(() => {
    dispatch(getTvShowFetch());
  }, [dispatch]);

  function changePage(_, value) {
    dispatch(getTvShowFetch(value));
  }

  return (
    <>
      
      <div className="pagination">
        <MoviesPagination
          count={tvShow_sect.total_pages}
          page={tvShow_sect.page_num}
          changePage={changePage}
          size="large"
        />
      </div>

      <div className="card-list-wrapper">
        <CardList cards={tvShow_sect.tvShow} dataFrom="tv"></CardList>
      </div>
      <div className="pagination">
        <MoviesPagination
          count={tvShow_sect.total_pages}
          page={tvShow_sect.page_num}
          changePage={changePage}
          size="large"
        />
      </div>
    </>
  );
}

export default TvShows;
