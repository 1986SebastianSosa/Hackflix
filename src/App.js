import { CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import theme from "./theme";
import UserMain from "./userMain/UserMain";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          <UserMain />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
