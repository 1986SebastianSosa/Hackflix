import { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import cameraIcon from "../../../img/camera_icon.png";
import axios from "axios";
import HeaderCarousel from "./HeaderCarousel";

const Trending = () => {
  const imgPath = process.env.REACT_APP_IMG_POSTER_PATH;
  const theme = useTheme();
  const navigate = useNavigate();
  const [trending, settrending] = useState([]);
  const [page, setPage] = useState(1);

  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_TMDB_KEY;

  const handleMore = () => {
    setPage((prev) => prev + 1);
  };

  const fetchMovies = async () => {
    const { data } = await axios({
      method: "get",
      baseURL: baseURL,
      url: "/trending/movie/day",
      params: { api_key: apiKey, page: page, include_adult: false },
    });
    settrending([...trending, ...data.results]);
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  return (
    <>
      <HeaderCarousel trending={trending} />
      <Container>
        <Typography variant="h2" textAlign="center" mt={2}>
          Trending
        </Typography>
        <InfiniteScroll
          dataLength={trending}
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
            {trending.map((film, index) => {
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
    </>
  );
};

export default Trending;
