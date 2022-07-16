import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function ColorTabs({ tab, setTab, setGridFilms, setPage }) {
  const handleChange = (event, newValue) => {
    setGridFilms([]);
    setPage(1);
    setTab(newValue);
  };

  const tabStyle = {
    color: "white",
    fontSize: "1.1rem",
    fontWeight: 600,
  };

  return (
    <Tabs
      variant="fullWidth"
      value={tab}
      onChange={handleChange}
      textColor="primary"
      indicatorColor="primary"
      aria-label="primary tabs example"
    >
      <Tab value="movie" label="Movies" sx={{ ...tabStyle }} />
      <Tab value="tv" label="TV Shows" sx={{ ...tabStyle }} />
    </Tabs>
  );
}
