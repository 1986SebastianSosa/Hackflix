import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import SearchIcon from "@mui/icons-material/Search";
import "./bottomNav.css";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <Box className="bottomNav">
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          backgroundColor: "background.default",
          py: "2rem",
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Trending"
          sx={{ color: "text.primary" }}
          icon={<WhatshotIcon />}
          onClick={() => navigate("/")}
        />
        <BottomNavigationAction
          label="Movies"
          sx={{ color: "text.primary" }}
          icon={<LocalMoviesIcon />}
          onClick={() => navigate("/movies")}
        />
        <BottomNavigationAction
          label="TV Shows"
          sx={{ color: "text.primary" }}
          icon={<ConnectedTvIcon />}
          onClick={() => navigate("/tvshows")}
        />
        <BottomNavigationAction
          label="Search"
          sx={{ color: "text.primary" }}
          icon={<SearchIcon />}
          onClick={() => navigate("/search")}
        />
      </BottomNavigation>
    </Box>
  );
}
