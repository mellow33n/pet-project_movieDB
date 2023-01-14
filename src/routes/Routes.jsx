import { lazy, Suspense } from "react";
import GetComponent from "./GetComponent";



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


 function Routes () {
  return [
  {
    path: "/",
    element: GetComponent(Dashboard),
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
    element: GetComponent(TVShows),
  },
  { 
    path: "tv-shows/:id", 
    element: GetComponent(TVShowInfo) 
  },
  { 
    path: "movies/:id", 
    element: GetComponent(CardInfo) 
  },
  { 
    path: "movies", 
    element: GetComponent(Movies) 
  },
  { 
    path: "searchResults/:id", 
    element: GetComponent(CardInfo) 
  },
  { 
    path: "searchResults", 
    element: GetComponent(searchResults) 
  },
  { 
    path: "favorites", 
    element: GetComponent(Favorites) 
  },
  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
]};

export default Routes
