import { useTheme } from "@emotion/react";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Search from "./Search";
import cameraIcon from "../../../img/camera_icon.png";
import { useNavigate, useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import FilmsGrid from "../../../img/FilmsGrid.jpg";
import ColorTabs from "./ColorTabs";

const SearchGrid = () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const imgPath = process.env.REACT_APP_IMG_POSTER_PATH;

  const theme = useTheme();
  const [gridFilms, setGridFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("movie");
  const navigate = useNavigate();
  const handleMore = () => {
    setPage((prev) => prev + 1);
  };

  console.log(tab);

  return (
    <>
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
        <Search
          tab={tab}
          search={search}
          setSearch={setSearch}
          gridFilms={gridFilms}
          setGridFilms={setGridFilms}
          page={page}
        />
        <ColorTabs
          tab={tab}
          setTab={setTab}
          setGridFilms={setGridFilms}
          setPage={setPage}
        />
        <InfiniteScroll
          dataLength={gridFilms}
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
            {gridFilms.map((film, index) => {
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

export default SearchGrid;
