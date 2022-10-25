import './Movies.scss';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';

import NavBar from '../../components/UI/NavBar/NavBar';
import { getMoviesFetch } from '../../components/Store/Reducers/moviesSlice';
import CardList from '../../components/CardList/CardList';
import MoviesPagination from '../../components/UI/Pagination/Pagination';
import MovieSearchBlock from '../../components/UI/SearchBlock/MovieSearchBlock';

function Movies() {
  
  const dispatch = useDispatch();
  const {movies_sect} = useSelector((data) => data);

  

  useEffect(() => {
    dispatch(getMoviesFetch())
  }, [dispatch])

  function changePage(_, value) {
    dispatch(getMoviesFetch(value))
    
  }

  return (<>
    <NavBar />
    <div className="pagination">
    <MoviesPagination count={movies_sect.total_pages} page={movies_sect.page_num} changePage={changePage} size='large'/>
    </div>
    <div className='card-list-wrapper grid-page'>
      <MovieSearchBlock></MovieSearchBlock>
    <CardList cards = {movies_sect.movies} dataFrom='movie'></CardList>
    
    </div>
    <div className="pagination">
    <MoviesPagination count={movies_sect.total_pages} page={movies_sect.page_num} changePage={changePage} size='large'/>
    </div>
    
    </>
  );
}

export default Movies;
