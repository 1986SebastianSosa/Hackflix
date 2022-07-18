import Slider from "react-slick";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import Logo from "../../../img/Logos/logo_transparent_edited_4.png";
import "./trending.css";

const HeaderCarousel = ({ trending }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imgPath = process.env.REACT_APP_IMG_BACKDROP;
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      {trending.length === 0 ? (
        <ContentLoader />
      ) : (
        <>
          <Slider
            autoplay={true}
            autoplaySpeed={5000}
            pauseOnHover={false}
            arrows={false}
            fade={true}
            style={{ textAlign: "center" }}
          >
            {trending.map((film) => {
              return (
                <Box key={film.id}>
                  <Box className="headerTitle">
                    <img
                      src={Logo}
                      alt="film.title"
                      style={{ width: "3rem", display: "inline" }}
                    />
                    <h1>{film.title}</h1>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        large
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "white",
                          backgroundColor: "rgba(252, 163, 17,0.8)",
                          mr: 2,
                        }}
                      >
                        <PlayArrowIcon fontSize="large" />
                        Play
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`/filmDetails/${film.id}`);
                        }}
                        variant="contained"
                        large
                        sx={{
                          fontSize: "1.1rem",
                          fontWeight: "500",
                          color: "white",
                          backgroundColor: "rgba(254, 202, 119, 0.3)",
                          ":hover": {
                            backgroundColor: "rgba(254, 202, 119, 0.1)",
                          },
                        }}
                      >
                        <InfoOutlinedIcon fontSize="large" sx={{ mr: 1 }} />
                        More Info
                      </Button>
                    </Box>
                  </Box>
                  <Box
                    className="headerImage"
                    width="100%"
                    height="85vh"
                    margin="auto"
                    textAlign="center"
                    sx={{
                      background: `linear-gradient(to top, transparent 80%, #181818), linear-gradient(to bottom, transparent 80%, #181818), url(${
                        imgPath + film.backdrop_path
                      })`,
                      opacity: "0.6",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      zIndex: "-100",
                    }}
                  ></Box>
                </Box>
              );
            })}
          </Slider>
        </>
      )}
    </>
  );
};

export default HeaderCarousel;
