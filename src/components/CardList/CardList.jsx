/* eslint-disable jsx-a11y/anchor-is-valid */
import "./CardList.scss";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
  addToFavoritesMovies,
  addToFavoritesTvShows,
} from "../Store/Reducers/moviesSlice";

function CardList({ cards, dashboard = false, dataFrom }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (dashboard && cards.length) {
    cards = cards.slice(0, 6);
  }
  function handleClick(id, dataFrom, mediaType) {
    switch (dataFrom) {
      case "movie":
        navigate(`/movies/${id}`);
        break;
      case "tv":
        navigate(`/tv-shows/${id}`);
        break;
      case "search":
        switch (mediaType) {
          case "movie":
            navigate(`/movies/${id}`);
            break;
          case "tv":
            navigate(`/tv-shows/${id}`);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }
  function handleFavorites(card, dataFrom) {
    switch (dataFrom) {
      case "movie":
        dispatch(addToFavoritesMovies(card));
        break;
      case "tv":
        dispatch(addToFavoritesTvShows(card));
        break;
      case "search":
        switch (card.media_type) {
          case "movie":
            dispatch(addToFavoritesMovies(card));
            break;
          case "tv":
            dispatch(addToFavoritesTvShows(card));
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 2 }}
        columns={
          dashboard ? { xs: 2, sm: 2, md: 12 } : { xs: 2, sm: 2, md: 10 }
        }
      >
        {cards.map((card, index) => (
          <Grid item xs={2} sm={4} md={2} key={card.id} sx={{position: 'relative'}}>
            <Button
              color="warning"
              startIcon={
                card.isFavorites ? <GradeRoundedIcon /> : <GradeOutlinedIcon />
              }
              onClick={() => {
                handleFavorites(card, dataFrom);
              }}
            ></Button>
            <div
              style={{
                width: 50,
                height: 50,
                fontSize: 12,
                position: "absolute",
                left: "63%",
                bottom: "83%",
                zIndex: 1,
              }}
            >
              <CircularProgressbar
                value={card.vote_average}
                text={`${card.vote_average}`}
                background
                backgroundPadding={6}
                maxValue={10}
                styles={buildStyles({
                  backgroundColor: "#00203F",
                  textColor: "#fff",
                  pathColor: "#fff",
                  trailColor: "transparent",
                  fontSize: "10",
                  textSize: '2rem',
                })}
              />
            </div>
            <Card
              sx={{ maxWidth: 200 }}
              onClick={() => {
                handleClick(card.id, dataFrom, card.media_type);
              }}
              id={card.id}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={"https://image.tmdb.org/t/p/w500" + card.poster_path}
                  alt={card.title || card.name}
                  id={card.id}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ height: 80 }}
                    id={card.id}
                  >
                    {card.title || card.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CardList;
