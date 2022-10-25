import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import RoutesList from "./routes/RoutesList";
import { store } from "./components/Store/store";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <RoutesList />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
