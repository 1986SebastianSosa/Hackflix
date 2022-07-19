import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fca311",
      shade: "#D28202",
      tint: "#FECA77",
    },
    secondary: {
      main: "#14213d",
      shade: "#949494",
    },
    text: { primary: "#e5e5e5", secondary: "#181818" },
    background: { default: "#181818", secondary: "#e5e5e5" },
  },
  typography: {
    fontFamily: "font-family: Crimson Text, serif",
    fontSize: 16,
    h1: { fontSize: "1rem" },
    h2: { fontSize: "3rem", marginBottom: "1rem" },
    body1: { marginBottom: "1rem" },
  },
});

export default theme;
