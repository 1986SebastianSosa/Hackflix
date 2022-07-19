import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  useTheme,
  Container,
  Typography,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import cameraIcon from "../../../img/camera_icon.png";
import MovieGenres from "../../MovieGenres";

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
      <CssBaseline />
      <Box>
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: "-100",
            opacity: "0.05",
            background: `linear-gradient(to top, transparent 80%, #181818), linear-gradient(to bottom, transparent 80%, #181818), url(https://i.ibb.co/wByQ4hR/Films-Grid.jpg)`,
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
          }}
        ></Box>
        <Container>
          <Typography variant="h2" textAlign="center" mt={2}>
            Movies
          </Typography>
          <MovieGenres
            sx={{ display: "inline" }}
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
                  <Grid item xs={7.5} sm={5} md={3} key={index}>
                    <Box
                      onClick={() => navigate(`/filmDetails/${film.id}`)}
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        textAlign: "center",
                        justifyContent: "center",
                        border: `1px solid ${theme.palette.primary.main}`,
                        // background: `center / contain no-repeat url(${
                        //   film.poster_path
                        //     ? imgPath + film.poster_path
                        //     : cameraIcon
                        // })`,
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      <img
                        src={
                          film.poster_path
                            ? imgPath + film.poster_path
                            : cameraIcon
                        }
                        alt={film.title}
                        style={{ width: "100%", objectFit: "cover" }}
                      />
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
      </Box>
    </>
  );
};

export default Movies;
