import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";


import { createTheme, ThemeProvider } from '@mui/material/styles';


import { store } from "./components/Store/store";
import RoutesWrapper from "./routes/RoutesWrapper";



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
          <RoutesWrapper/>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
