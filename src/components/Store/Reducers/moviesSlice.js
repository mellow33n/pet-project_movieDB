import { createSlice } from "@reduxjs/toolkit"
import {
    getMovies,
    getMoviesByPopular,
    getMoviesGenres,
    getMoviesBySearh,
    getSearchResults,
    getLanguages,
    getTvShow,
    getTvShowByPopular,
    getTvGenres,
    getMovieCardInfo,
    getTvShowCardInfo
} from "../../../api/moviedb";
import { createAsyncThunk } from "@reduxjs/toolkit/";

// movies

export const getMoviesFetch = createAsyncThunk('movies/getMoviesFetch', async (page = 1) => {
    const data = await getMovies(page);
    return data;
});
export const getMoviesBySearchFetch = createAsyncThunk('movies/getMoviesBySearchFetch', async ({ defaultPage = 1, genres = false, lang = false }) => {
    const data = await getMoviesBySearh(defaultPage, genres, lang);

    return data;
});
export const getMoviesPopFetch = createAsyncThunk('movies/getMoviesPopFetch', async () => {
    const data = await getMoviesByPopular();
    return data;
});
export const getMoviesGenresFetch = createAsyncThunk('movies/getMoviesGenresFetch', async () => {
    const data = await getMoviesGenres();
    return data;
});
export const getMovieCardInfoFetch = createAsyncThunk('movies/getMovieCardInfoFetch', async (id) => {
    const data = await getMovieCardInfo(id);
    return data;
});

// tv shows

export const getTvShowFetch = createAsyncThunk('tvShow/getTvFetch', async (page = 1) => {
    const data = await getTvShow(page);
    return data;
});
export const getTvShowPopFetch = createAsyncThunk('tvShow/getTvPopFetch', async () => {
    const data = await getTvShowByPopular();
    return data;
});
export const getTvGenresFetch = createAsyncThunk('tvShow/getTvGenresFetch', async () => {
    const data = await getTvGenres();
    return data;
});
export const getTvShowCardInfoFetch = createAsyncThunk('movies/getTvShowCardInfoFetch', async (id) => {
    const data = await getTvShowCardInfo(id);
    return data;
});

// search

export const getSearchFetch = createAsyncThunk('search/getSearchFetch', async ({ value, page = 1 }) => {
    const data = await getSearchResults(value, page);
    return data;
});
export const getLanguagesFetch = createAsyncThunk('search/getLanguagesFetch', async () => {
    const data = await getLanguages();
    return data;
});

export const moviesDBSlice = createSlice({
    name: 'movies_db',
    initialState: {
        movies_sect: {
            movies: [],
            total_pages: null,
            page_num: 1,
            loaded: false,
            loading: false,
            error: null,
            genres: [],
            fetchStrID: '',
            favoritesMovies: [],
            movie_card: [],
        },
        tvShow_sect: {
            tvShow: [],
            favoritesTvShows: [],
            total_pages: null,
            page_num: 1,
            loaded: false,
            loading: false,
            error: null,
            genres: [],
            tvShow_card: [],
        },
        search_sect: {
            results: [],
            copyResults: [],
            total_pages: null,
            page_num: 1,
            loaded: false,
            loading: false,
            error: null,
            query: '',
            searchByGenresID: '',
            languages: [],
            auth: false,
            favorites: {
                movies: [],
                tvShow: [],
            },
        },
        user_data: {
            loged: false,
            login: null,
            
        },
    },
    reducers: {
        // movies
        selectMoviesGenres: (state, action) => {
            state.movies_sect.genres = action.payload
        },
        getFetchStringID: (state, action) => {
            state.movies_sect.fetchStrID = state.movies_sect.genres.map((value) => value.selected ? (value.id + '') : false).filter((value) => value).join()
        },
        addToFavoritesMovies: (state, action) => {
            const card = { ...action.payload };
            card.isFavorites = !card.isFavorites;
            // сохрнаяю в массив фильмов
            state.movies_sect.movies.map((value) => value.id === card.id ? value.isFavorites = !value.isFavorites : value);
            // если это поиск - сохраняю в массив поиска
            if (card.media_type === 'movie') {
                state.search_sect.results.map((value) => value.id === card.id ? value.isFavorites = !value.isFavorites : value);
            }

            /* MOVIES */
            if (state.movies_sect.favoritesMovies.length) {
                //определяем есть ли карточка в массиве
                const findCardIndex = state.movies_sect.favoritesMovies.findIndex((value) => value.id === card.id);
                // удаляем карточку если она есть в массиве
                if (findCardIndex + 1) {
                    state.movies_sect.favoritesMovies.splice(findCardIndex, 1);
                } else {
                    // если карточку не нашли, добавляем
                    state.movies_sect.favoritesMovies.push(card);
                }
            } else {
                state.movies_sect.favoritesMovies.push(card);
            }

            /* SEARCH */
            if (state.search_sect.favorites.movies.length) {
                //определяем есть ли карточка в массиве
                const findCardIndex = state.search_sect.favorites.movies.findIndex((value) => value.id === card.id);
                // удаляем карточку если она есть в массиве
                if (findCardIndex + 1) {
                    state.search_sect.favorites.movies.splice(findCardIndex, 1);
                } else {
                    // если карточку не нашли, добавляем
                    state.search_sect.favorites.movies.push(card);
                }
            } else {
                state.search_sect.favorites.movies.push(card);
            }
            /* CARD-INFO */
            if (card.id === state.movies_sect.movie_card.id) {
                state.movies_sect.movie_card.isFavorites = !state.movies_sect.movie_card.isFavorites
            }
        },
        // tv shows
        addToFavoritesTvShows: (state, action) => {
            const card = { ...action.payload };
            card.isFavorites = !card.isFavorites;
            // сохрнаяю в массив фильмов
            state.tvShow_sect.tvShow.map((value) => value.id === card.id ? value.isFavorites = !value.isFavorites : value);

            // если это поиск - сохраняю в массив поиска
            if (card.media_type === 'tv') {
                state.search_sect.results.map((value) => value.id === card.id ? value.isFavorites = !value.isFavorites : value);
            }

            /* TV SHOW */
            if (state.tvShow_sect.favoritesTvShows.length) {
                //определяем есть ли карточка в массиве
                const findCardIndex = state.tvShow_sect.favoritesTvShows.findIndex((value) => value.id === card.id);
                // удаляем карточку если она есть в массиве
                if (findCardIndex + 1) {
                    state.tvShow_sect.favoritesTvShows.splice(findCardIndex, 1);
                } else {
                    // если карточку не нашли, добавляем
                    state.tvShow_sect.favoritesTvShows.push(card);
                }
            } else {
                state.tvShow_sect.favoritesTvShows.push(card);
            }
            /* SEARCH */
            if (state.search_sect.favorites.tvShow.length) {
                //определяем есть ли карточка в массиве
                const findCardIndex = state.search_sect.favorites.tvShow.findIndex((value) => value.id === card.id);
                // удаляем карточку если она есть в массиве
                if (findCardIndex + 1) {
                    state.search_sect.favorites.tvShow.splice(findCardIndex, 1);
                } else {
                    // если карточку не нашли, добавляем
                    state.search_sect.favorites.tvShow.push(card);
                }
            } else {
                state.search_sect.favorites.tvShow.push(card);
            }
            /* CARD-INFO */
            if (card.id === state.tvShow_sect.tvShow_card.id) {
                state.tvShow_sect.tvShow_card.isFavorites = !state.tvShow_sect.tvShow_card.isFavorites
            }
        },
        // search
        addQueryData: (state, action) => {
            state.search_sect.query = action.payload;
        },
        addSearchGenres: (state, action) => {
            state.search_sect.searchByGenresID = action.payload;
        },
        setAuth: (state, action) => {
            state.search_sect.auth = true;
        },
    },
    extraReducers: (builder) => {
        // movies
        builder.addCase(getMoviesFetch.pending, (state, action) => {
            state.movies_sect.loading = true;
            state.movies_sect.loaded = false;
            state.movies_sect.error = false;
            state.movies_sect.movies = [];
        }).addCase(getMoviesFetch.fulfilled, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = null;
            state.movies_sect.movies = action.payload.data.results.map((value) => Object.assign({}, value, { isFavorites: false }));
            for (let card of state.movies_sect.movies) {
                for (let favCard of state.movies_sect.favoritesMovies) {
                    if (card.id === favCard.id) {
                        card.isFavorites = true;
                    }
                }
            };
            state.movies_sect.total_pages = action.payload.data.total_pages;
            state.movies_sect.page_num = action.payload.data.page;
        }).addCase(getMoviesFetch.rejected, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = action.error;
        }).addCase(getMoviesPopFetch.pending, (state, action) => {
            state.movies_sect.loading = true;
            state.movies_sect.loaded = false;
            state.movies_sect.error = false;
            state.movies_sect.movies = [];
        }).addCase(getMoviesPopFetch.fulfilled, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = null;
            state.movies_sect.movies = action.payload.data.results;
            state.movies_sect.total_pages = action.payload.data.total_pages;
            state.movies_sect.page_num = action.payload.data.page;
        }).addCase(getMoviesPopFetch.rejected, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = action.error;
        }).addCase(getMoviesGenresFetch.pending, (state, action) => {
            state.movies_sect.loading = true;
            state.movies_sect.loaded = false;
            state.movies_sect.error = false;
            state.movies_sect.movies = [];
        }).addCase(getMoviesGenresFetch.fulfilled, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = null;
            state.movies_sect.genres = action.payload.data.genres;
        }).addCase(getMoviesGenresFetch.rejected, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = action.error;
        }).addCase(getMoviesBySearchFetch.pending, (state, action) => {
            state.movies_sect.loading = true;
            state.movies_sect.loaded = false;
            state.movies_sect.error = false;
            state.movies_sect.movies = [];
        }).addCase(getMoviesBySearchFetch.fulfilled, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = null;
            state.movies_sect.movies = action.payload.data.results;
            state.movies_sect.total_pages = action.payload.data.total_pages;
            state.movies_sect.page_num = action.payload.data.page;
        }).addCase(getMoviesBySearchFetch.rejected, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = action.error;
        }).addCase(getMovieCardInfoFetch.pending, (state, action) => {
            state.movies_sect.loading = true;
            state.movies_sect.loaded = false;
            state.movies_sect.error = false;
            state.movies_sect.movie_card = [];
        }).addCase(getMovieCardInfoFetch.fulfilled, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = null;
            state.movies_sect.movie_card = Object.assign({}, action.payload.data, { isFavorites: false });
            for (let card of state.movies_sect.favoritesMovies) {
                if (card.id === state.movies_sect.movie_card.id) {
                    state.movies_sect.movie_card.isFavorites = true
                }
            }
        }).addCase(getMovieCardInfoFetch.rejected, (state, action) => {
            state.movies_sect.loading = false;
            state.movies_sect.loaded = true;
            state.movies_sect.error = action.error;
            // tv shows
        }).addCase(getTvShowFetch.pending, (state, action) => {
            state.tvShow_sect.loading = true;
            state.tvShow_sect.loaded = false;
            state.tvShow_sect.error = false;
            state.tvShow_sect.tvShow = [];
        }).addCase(getTvShowFetch.fulfilled, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = null;
            state.tvShow_sect.tvShow = action.payload.data.results.map((value) => Object.assign({}, value, { isFavorites: false }));
            for (let card of state.tvShow_sect.tvShow) {
                for (let favCard of state.tvShow_sect.favoritesTvShows) {
                    if (card.id === favCard.id) {
                        card.isFavorites = true;
                    }
                }
            };
            state.tvShow_sect.total_pages = action.payload.data.total_pages;
            state.tvShow_sect.page_num = action.payload.data.page;
        }).addCase(getTvShowFetch.rejected, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = action.error;
        }).addCase(getTvShowPopFetch.pending, (state, action) => {
            state.tvShow_sect.loading = true;
            state.tvShow_sect.loaded = false;
            state.tvShow_sect.error = false;
            state.tvShow_sect.tvShow = [];
        }).addCase(getTvShowPopFetch.fulfilled, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = null;
            state.tvShow_sect.tvShow = action.payload.data.results.map((value) => Object.assign({}, value, { isFavorites: false }));
            for (let card of state.tvShow_sect.tvShow) {
                for (let favCard of state.tvShow_sect.favoritesTvShows) {
                    if (card.id === favCard.id) {
                        card.isFavorites = true;
                    }
                }
            };
            state.tvShow_sect.total_pages = action.payload.data.total_pages;
            state.tvShow_sect.page_num = action.payload.data.page;
        }).addCase(getTvShowPopFetch.rejected, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = action.error;
        }).addCase(getTvGenresFetch.pending, (state, action) => {
            state.tvShow_sect.loading = true;
            state.tvShow_sect.loaded = false;
            state.tvShow_sect.error = false;
            state.tvShow_sect.movies = [];
        }).addCase(getTvGenresFetch.fulfilled, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = null;
            state.tvShow_sect.genres = action.payload.data.genres;
        }).addCase(getTvGenresFetch.rejected, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = action.error;
        }).addCase(getTvShowCardInfoFetch.pending, (state, action) => {
            state.tvShow_sect.loading = true;
            state.tvShow_sect.loaded = false;
            state.tvShow_sect.error = false;
            state.tvShow_sect.tvShow_card = [];
        }).addCase(getTvShowCardInfoFetch.fulfilled, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = null;
            state.tvShow_sect.tvShow_card = Object.assign({}, action.payload.data, { isFavorites: false });
            for (let card of state.tvShow_sect.favoritesTvShows) {
                if (card.id === state.tvShow_sect.tvShow_card.id) {
                    state.tvShow_sect.tvShow_card.isFavorites = true
                }
            }
        }).addCase(getTvShowCardInfoFetch.rejected, (state, action) => {
            state.tvShow_sect.loading = false;
            state.tvShow_sect.loaded = true;
            state.tvShow_sect.error = action.error;
            // search
        }).addCase(getSearchFetch.pending, (state, action) => {
            state.search_sect.loading = true;
            state.search_sect.loaded = false;
            state.search_sect.error = false;
            state.search_sect.results = [];
        }).addCase(getSearchFetch.fulfilled, (state, action) => {
            state.search_sect.loading = false;
            state.search_sect.loaded = true;
            state.search_sect.error = null;
            state.search_sect.results = action.payload.data.results.map((value) => Object.assign({}, value, { isFavorites: false }));
            for (let card of state.search_sect.results) {
                for (let favCardMovie of state.search_sect.favorites.movies) {
                    if (card.id === favCardMovie.id) {
                        card.isFavorites = true;
                    }
                }
                for (let favCardTv of state.search_sect.favorites.tvShow) {
                    if (card.id === favCardTv.id) {
                        card.isFavorites = true;
                    }
                }
            }
            state.search_sect.total_pages = action.payload.data.total_pages;
            state.search_sect.page_num = action.payload.data.page;
        }).addCase(getSearchFetch.rejected, (state, action) => {
            state.search_sect.loading = false;
            state.search_sect.loaded = true;
            state.search_sect.error = action.error;
        }).addCase(getLanguagesFetch.pending, (state, action) => {
            state.search_sect.loading = true;
            state.search_sect.loaded = false;
            state.search_sect.error = false;
            state.search_sect.results = [];
        }).addCase(getLanguagesFetch.fulfilled, (state, action) => {
            state.search_sect.loading = false;
            state.search_sect.loaded = true;
            state.search_sect.error = null;
            state.search_sect.languages = action.payload;
        }).addCase(getLanguagesFetch.rejected, (state, action) => {
            state.search_sect.loading = false;
            state.search_sect.loaded = true;
            state.search_sect.error = action.error;
        })
    }
});
export const { selectMoviesGenres, getFetchStringID, addToFavoritesMovies, clearSearchResults, addQueryData, addSearchGenres, setAuth, addToFavoritesTvShows } = moviesDBSlice.actions;
export default moviesDBSlice.reducer;