import {
  CssBaseline,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_KEY;

const Search = ({
  gridFilms,
  setGridFilms,
  page,
  setPage,
  search,
  setSearch,
  tab,
}) => {
  const theme = useTheme();
  console.log(tab);
  const getFilms = async (url) => {
    const res = await axios({
      method: "get",
      baseURL: baseUrl,
      url: `/search/${tab}`,
      params: {
        api_key: apiKey,
        query: search,
        include_adult: false,
        sort_by: "popularity.desc",
        page: page,
      },
    });

    return setGridFilms([...gridFilms, ...res.data.results]);
  };

  const handleSearch = (e) => {
    setPage(1);
    setGridFilms([]);
    setSearch(e.target.value);
  };

  useEffect(() => {
    getFilms("/discover/movie");
  }, [page, search, tab]);

  return (
    <>
      <CssBaseline />
      <Typography variant="h2" textAlign="center" mt={2}>
        Search
      </Typography>
      <Grid container spacing={2} my={5}>
        <Grid item xs={12}>
          <TextField
            sx={{ width: "100%" }}
            label={
              tab === "movie"
                ? "Search for a Film..."
                : "Search for a TV Show..."
            }
            color="primary"
            focused
            value={search}
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
