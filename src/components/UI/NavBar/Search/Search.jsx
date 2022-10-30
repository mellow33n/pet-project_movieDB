import { Fragment } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import {
  getSearchFetch,
  addQueryData,
} from "../../../Store/Reducers/moviesSlice";

export default function SearchBar() {
  const { search_sect } = useSelector((data) => data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    const valueForIF = value.replaceAll(/[^a-z0-9]/gi,'');
    if (valueForIF) {
      dispatch(getSearchFetch({ value }));
      dispatch(addQueryData(value));
      event.target.value = '';
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const value = e.nativeEvent.path[0][0].value;
    const valueForIF = value.replaceAll(/[^a-z0-9]/gi,'');
    if (valueForIF) {
      navigate("/searchResults");
    }
  }

  function onClose (event, reason) {
    event.preventDefault();
    event.target.value = ''
  }

  return (
    <form action="" className="search-form" onSubmit={handleSubmit}>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: "100%" }}
        isOptionEqualToValue={(option, value) =>
          option.title === value.title || option.name === value.name
        }
        getOptionLabel={(option) => option.name || option.title}
        options={search_sect.results}
        loading={search_sect.loading}
        clearOnBlur={false}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={handleChange}
            label="Search by title"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </form>
  );
}
