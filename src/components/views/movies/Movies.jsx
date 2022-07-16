import React, { useState, useEffect } from "react";
import { Box, Grid, useTheme, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import cameraIcon from "../../../img/camera_icon.png";
import Genres from "../../Genres";

const Movies = () => {
  const imgPath = process.env.REACT_APP_IMG_POSTER_PATH;
  const theme = useTheme();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState({});

  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_TMDB_KEY;

  const handleMore = () => {
    setPage((prev) => prev + 1);
  };

  const fetchMovies = async () => {
    const { data } = await axios({
      method: "get",
      baseURL: baseURL,
      url: "/discover/movie",
      params: {
        api_key: apiKey,
        page: page,
        include_adult: false,
        with_genres: selectedGenre,
      },
    });
    setMovies([...movies, ...data.results]);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, selectedGenre]);

  return (
    <>
      <Container>
        <Genres
          type="movie"
          setMovies={setMovies}
          setPage={setPage}
          genres={genres}
          setGenres={setGenres}
          setSelectedGenre={setSelectedGenre}
        />
        <InfiniteScroll
          dataLength={movies}
          next={handleMore}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Grid container spacing={3} columns={15}>
            {movies.map((film, index) => {
              return (
                <Grid item xs={12} md={3} key={index}>
                  <Box
                    onClick={() => navigate(`/filmDetails/${film.id}`)}
                    sx={{
                      width: "100%",
                      height: "315px",
                      display: "flex",
                      alignItems: "flex-end",
                      textAlign: "center",
                      justifyContent: "center",
                      border: `1px solid ${theme.palette.primary.main}`,
                      background: `center / contain no-repeat url(${
                        film.poster_path
                          ? imgPath + film.poster_path
                          : cameraIcon
                      })`,
                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {!film.poster_path && (
                      <Typography variant="h6">{film.title}</Typography>
                    )}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default Movies;
