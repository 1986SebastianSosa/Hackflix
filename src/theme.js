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
    text: { primary: "#e5e5e5", secondary: "#14213d" },
    background: { default: "#181818", secondary: "#e5e5e5" },
  },
});

export default theme;
