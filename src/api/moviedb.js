import axios from 'axios';
import { API_KEY } from '../config/config'

const apiBaseURL = 'https://api.themoviedb.org/3';
const authQuerryParam = `?api_key=${API_KEY}`;

const moviedbAxios = axios.create({
  baseURL: apiBaseURL,
});

export const getMovies = function (page = 1) {
  return moviedbAxios.get(('discover/movie' + authQuerryParam + `&page=${page}`));
};
export const getMoviesBySearh = function (defaultPage = 1, genres = false, lang = false) {
  return moviedbAxios.get(('discover/movie' + authQuerryParam + `&page=${defaultPage}` + (genres ? `&with_genres=${genres}` : '') + (lang ? `&with_original_language=${lang}` : '')));
};

export const getMoviesByPopular = function (page = 1) {
  return moviedbAxios.get(('/discover/movie' + authQuerryParam + `&sort_by=popularity.desc&page=${page}`));
};

// tv-shows

export const getTvShow = function (page = 1) {
  return moviedbAxios.get(('discover/tv' + authQuerryParam + `&page=${page}`));
};

export const getTvShowByPopular = function (page = 1) {
  return moviedbAxios.get(('/discover/tv' + authQuerryParam + `&sort_by=popularity.desc&page=${page}`));
};

export const getSearchResults = function (query, page = 1) {
  return moviedbAxios.get(('/search/multi' + authQuerryParam + `&query=${query}&page=${page}`));
}
export const getMovieCardInfo = function (id) {
  return moviedbAxios.get(('/movie/' + id + authQuerryParam));
}
export const getTvShowCardInfo = function (id) {
  return moviedbAxios.get(('/tv/' + id + authQuerryParam));
}
export const getMoviesGenres = function () {
  return moviedbAxios.get(('/genre/movie/list' + authQuerryParam));
}
export const getTvGenres = function () {
  return moviedbAxios.get(('/genre/tv/list' + authQuerryParam));
}
export const getLanguages = function () {
  return moviedbAxios.get('/configuration/languages' + authQuerryParam)
}

