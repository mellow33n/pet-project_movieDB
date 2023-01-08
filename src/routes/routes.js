import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";


const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/Login/Login"));
const TVShows = lazy(() => import("../pages/TVShows/TVShows"));
const Favorites = lazy(() => import("../pages/Favorites/Favorites"));
const TVShowInfo = lazy(() => import("../pages/Tvinfo/TVinfo"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const Registration = lazy(() => import("../pages/Registration/Registration"));
const Movies = lazy(() => import("../pages/Movies/Movies"));
const CardInfo = lazy(() => import("../pages/MovieInfo/MovieInfo"));
const searchResults = lazy(() => import("../pages/SearchResults/SearchResults"));

function getComponent(Component) {
  /* const TOKEN = localStorage.getItem("AUTH_TOKEN"); */
  const TOKEN = true; 
  return TOKEN ? (
    <Suspense>
      <Component />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}

export const routes = [
  {
    path: "/",
    element: getComponent(Dashboard),
  },
  {
    path: "login",
    element: (
      <Suspense>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "registration",
    element: (
      <Suspense>
        <Registration />
      </Suspense>
    ),
  },
  {
    path: "tv-shows",
    element: getComponent(TVShows),
  },
  { 
    path: "tv-shows/:id", 
    element: getComponent(TVShowInfo) 
  },
  { 
    path: "movies/:id", 
    element: getComponent(CardInfo) 
  },
  { 
    path: "movies", 
    element: getComponent(Movies) 
  },
  { 
    path: "searchResults/:id", 
    element: getComponent(CardInfo) 
  },
  { 
    path: "searchResults", 
    element: getComponent(searchResults) 
  },
  { 
    path: "favorites", 
    element: getComponent(Favorites) 
  },
  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
];
