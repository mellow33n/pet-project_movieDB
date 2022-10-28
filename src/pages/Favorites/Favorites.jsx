import * as React from "react";
import { useSelector } from "react-redux/es/exports";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import NavBar from "../../components/UI/NavBar/NavBar";
import CardList from "../../components/CardList/CardList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Favorites() {
  const { movies_sect, tvShow_sect } = useSelector((data) => data);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <NavBar />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Favorites movies" {...a11yProps(0)} />
            <Tab label="Favorites TV-shows" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <CardList
            cards={movies_sect.favoritesMovies}
            dataFrom="movie"
          ></CardList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CardList
            cards={tvShow_sect.favoritesTvShows}
            dataFrom="tv"
          ></CardList>
        </TabPanel>
      </Box>
    </>
  );
}
