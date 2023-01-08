import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import RoutesList from "./routes/RoutesList";
import { store } from "./components/Store/store";
import NavBar from "./components/UI/NavBar/NavBar";

const theme = createTheme({
  palette: {
    primary: {
      main: '#00203F',
    },
    secondary: {
      main: '#ADF0D1',
    },
  },
});

function App() {
  const TOKEN = localStorage.getItem("AUTH_TOKEN");
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          {TOKEN ? <NavBar /> : null}
          <RoutesList />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
