import "./MovieSearchBlock.scss";
import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";

import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import {
  getMoviesGenresFetch,
  getMoviesBySearchFetch,
  getLanguagesFetch,
  selectMoviesGenres,
  getFetchStringID,
} from "../../Store/Reducers/moviesSlice";



function MovieSearchBlock() {
  const { movies_sect, search_sect } = useSelector((data) => data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesGenresFetch());
    dispatch(getLanguagesFetch());
  }, [dispatch]);

  const getStrID = () => {
    dispatch(getFetchStringID());
  };

  const handleClick = (id) => {
    const genresIndex = movies_sect.genres.findIndex((value) => value.id === id);
    const newGenresArr = JSON.parse(JSON.stringify(movies_sect.genres));
    newGenresArr.map((value, index) =>
      index === genresIndex ? (value.selected = true) : value
    );
    dispatch(selectMoviesGenres(newGenresArr));
    getStrID();
  };

  const handleDelete = (id) => {
    const genresIndex = movies_sect.genres.findIndex((value) => value.id === id);
    const newGenresArr = JSON.parse(JSON.stringify(movies_sect.genres));
    newGenresArr.map((value, index) =>
      index === genresIndex ? (value.selected = false) : value
    );
    dispatch(selectMoviesGenres(newGenresArr));
    getStrID();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedLanguage = event.nativeEvent.path[1][0].value;
    const lang = search_sect.languages.data
      .map((value) =>
        value.english_name === selectedLanguage ? value.iso_639_1 : false
      )
      .filter((value) => value)
      .toString();

    const defalutPage = 1;
    const genres = movies_sect.fetchStrID;
    dispatch(getMoviesBySearchFetch({ defalutPage, genres, lang }));
  };
  return (
    <>
      <form action="" className="extended-search">
        <h2>Filter form</h2>
        <Card>
          <Autocomplete
            id="lang-search"
            sx={{ width: "100%", marginTop: "10px" }}
            isOptionEqualToValue={(option, value) =>
              option.english_name === value.title || option.name === value.name
            }
            getOptionLabel={(option) => option.english_name}
            options={search_sect.languages.data}
            loading={search_sect.loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search by languages"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>{params.InputProps.endAdornment}</Fragment>
                  ),
                }}
              />
            )}
          />
          <h3>Pick the genres</h3>
          <Stack direction="row" spacing={1} className="genres-list">
            {movies_sect.genres.map((value) =>
              value.selected ? (
                <Chip
                  label={value.name}
                  variant="outlined"
                  onClick={() => handleClick(value.id)}
                  key={value.id}
                  onDelete={() => handleDelete(value.id)}
                  sx={{ backgroundColor: "#ADF0D1" }}
                />
              ) : (
                <Chip
                  label={value.name}
                  variant="outlined"
                  onClick={() => handleClick(value.id)}
                  key={value.id}
                />
              )
            )}
          </Stack>
        </Card>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          type="submit"
        >
          Filter
        </Button>
      </form>
    </>
  );
}

export default MovieSearchBlock;
