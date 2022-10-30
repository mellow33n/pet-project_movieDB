import "../Movies/Movies.scss";

import { useDispatch, useSelector } from "react-redux/es/exports";

import CircularProgress from "@mui/material/CircularProgress";

import CardList from "../../components/CardList/CardList";
import MoviesPagination from "../../components/UI/Pagination/Pagination";
import { getSearchFetch } from "../../components/Store/Reducers/moviesSlice";

function SearchResults() {
  const dispatch = useDispatch();
  const { search_sect } = useSelector((data) => data);

  function changePage(_, page) {
    const value = search_sect.query;
    dispatch(getSearchFetch({ value, page }));
  }

  return (
    <>
      <div className="pagination">
        <MoviesPagination
          count={search_sect.total_pages}
          page={search_sect.page_num}
          changePage={changePage}
          size="large"
        />
      </div>
      <div className="card-list-wrapper">
        {search_sect.loading ? (
          <CircularProgress color="inherit" size={20} />
        ) : null}
        <CardList cards={search_sect.results} dataFrom="search"></CardList>
      </div>
    </>
  );
}

export default SearchResults;
