import { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

import { getSearchFetch, addQueryData } from "../../../Store/Reducers/moviesSlice";

export default function SearchBar() {
  const { search_sect } = useSelector((data) => data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.target.value
    event.preventDefault();
    dispatch(getSearchFetch({value}));
    dispatch(addQueryData(event.target.value));
  }

 /*  function closeSearch() {
    dispatch(clearSearchResults());
  } */

  function handleSubmit(event) {
    event.preventDefault();
    navigate('/searchResults');
  }

  return (
    <form action="" className="search-form">
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: "100%" }}
 
        isOptionEqualToValue={(option, value) =>
          option.title === value.title || option.name === value.name
        }
        getOptionLabel={(option) => option.name || option.title}
        options={search_sect.results}
        loading={search_sect.loading}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleChange}
            label="Search by title"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {search_sect.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} type='submit'>
            Search
      </Button>
    </form>
  );
}
