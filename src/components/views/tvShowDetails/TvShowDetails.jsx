import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import "./tvShowDetails.css";
import cameraIcon from "../../../img/camera_icon.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ClockLoader } from "react-spinners";

const TvShowDetails = () => {
  const params = useParams();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const posterPath = process.env.REACT_APP_IMG_POSTER_PATH;
  const backdropPath = "https://image.tmdb.org/t/p/w780";
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedShow, setSelectedShow] = useState({});
  const [crew, setCrew] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarShows, setSimilarShows] = useState([]);
  const query900 = useMediaQuery("(min-width:900px)");

  const crewCardStyle = {
    marginTop: "5px",
    width: "115px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "15px",
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.secondary,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getOneShow = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/tv/${params.id}?api_key=${apiKey}`
        );
        console.log(response.data);
        setSelectedShow(response.data);
      } catch (err) {
        return err;
      }
    };
    getOneShow();

    const getShowCredits = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/tv/${params.id}/credits?api_key=${apiKey}`
        );
        console.log(response.data);
        setCrew(response.data.crew);
        setCast(response.data.cast);
      } catch (err) {
        return err;
      }
    };
    getShowCredits();

    const getSimilarShows = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/tv/${params.id}/similar?api_key=${apiKey}`
        );
        setSimilarShows(response.data.results);
      } catch (err) {
        return err;
      }
    };
    getSimilarShows();
  }, [params]);

  const director = crew.find((crewMember) => crewMember.job === "Director");
  const actors = [];

  if (cast.length > 0) {
    for (let i = 0; i < 3; i++) {
      actors.push(cast[i]);
    }
  }

  return (
    <>
      <CssBaseline />

      {Object.entries(selectedShow).length === 0 ? (
        <ClockLoader color="white" cssOverride={{ margin: "auto" }} />
      ) : (
        <main>
          <Box sx={{ overflow: "hidden" }}>
            <Box
              sx={{
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: "-100",
                opacity: "0.15",
                top: 0,
                left: 0,
                background: `linear-gradient(to bottom, transparent 80%, #181818), url(${
                  backdropPath + selectedShow.backdrop_path
                })`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></Box>
            <Container>
              <Grid container spacing={5} mt={2} mb={5}>
                <Grid item md={4} xs={12}>
                  <Box
                    sx={{
                      width: { md: "100%", xs: "50%" },
                      margin: "auto",
                      display: "flex",
                      alignItems: "flex-end",
                      textAlign: "center",
                      justifyContent: "center",
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: "15px",

                      // background: `center / cover no-repeat url(${
                      //   selectedShow.poster_path
                      //     ? posterPath + selectedShow.poster_path
                      //     : cameraIcon
                      // })`,
                      // backgroundColor: theme.palette.background.secondary,

                      ":hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    {" "}
                    <img
                      src={
                        selectedShow.poster_path
                          ? posterPath + selectedShow.poster_path
                          : cameraIcon
                      }
                      alt={selectedShow.title}
                      style={{ width: "100%", borderRadius: "15px" }}
                    />
                  </Box>
                </Grid>
                <Grid item md={8} xs={12} display="flex" flexDirection="column">
                  <Typography
                    variant="h4"
                    fontWeight="800"
                    display="inline"
                    mr={2}
                    sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
                  >
                    {selectedShow.name}
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "400", fontSize: "1.8rem" }}
                  >
                    ({selectedShow.first_air_date.slice(0, 4)})
                  </Typography>
                  <Box sx={{ display: { md: "flex", xs: "none" } }}>
                    <ul className="selectedShowDetails">
                      <li>
                        <p>
                          {selectedShow.first_air_date.replaceAll("-", "/")}
                        </p>
                      </li>
                      <li>
                        <p>
                          {selectedShow.genres.map((genre) => genre.name + "/")}
                        </p>
                      </li>
                      <li>
                        <p>{selectedShow.runtime + " mins"}</p>
                      </li>
                    </ul>
                  </Box>

                  <Typography variant="body2">
                    {" "}
                    <i>{selectedShow.tagline}</i>
                  </Typography>
                  <Typography variant="p" fontSize="1.2rem" mt={3} mb={1}>
                    <b> Overview:</b>
                  </Typography>

                  <Typography variant="p" display="block">
                    {selectedShow.overview}
                  </Typography>
                  {crew && (
                    <Grid container mt={1} spacing={3} height="100%">
                      <Grid xs={12} sm={4} display="flex" alignItems="center">
                        <Box textAlign="center" m="auto">
                          <p>
                            <b> Directed by: </b>
                          </p>
                          {director ? director.name : null}
                          <Box>
                            <img
                              src={
                                director
                                  ? director.profile_path
                                    ? posterPath + director.profile_path
                                    : cameraIcon
                                  : cameraIcon
                              }
                              alt={director && director.name}
                              style={crewCardStyle}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Box
                          sx={{
                            width: "100%",
                            textAlign: "center",
                            borderBottom: `1px solid ${theme.palette.primary.main}`,
                            mb: 1,
                          }}
                        >
                          <p>
                            <b> Starring </b>
                          </p>
                        </Box>
                        <Grid container>
                          {actors.map((actor) => {
                            return (
                              <Grid item xs={4} textAlign="center">
                                <Box>
                                  <img
                                    src={
                                      actor
                                        ? actor.profile_path
                                          ? posterPath + actor.profile_path
                                          : cameraIcon
                                        : cameraIcon
                                    }
                                    alt={actor.name}
                                    style={crewCardStyle}
                                  />
                                </Box>
                                <p>{actor.name}</p>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
        </main>
      )}
      <section>
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: "-100",
            opacity: "0.05",

            background: `linear-gradient(to top, transparent 80%, #181818), url(https://i.ibb.co/wByQ4hR/Films-Grid.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Box>
        <Box my={5}>
          <h1 style={{ textAlign: "center" }}>Similar Shows</h1>
          <Slider
            arrows={false}
            autoplay={true}
            slidesToShow={query900 ? 5 : 3}
            slidesToScroll={2}
            speed={1000}
            autoplaySpeed={4000}
          >
            {similarShows.map((film, index) => (
              <Box
                key={index}
                my={3}
                textAlign="center"
                onClick={() => navigate(`/tvshowDetails/${film.id}`)}
                sx={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  ":hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: { sm: "1.5rem" },
                  }}
                >
                  {film.title}
                </Typography>
                <img
                  src={
                    film.poster_path
                      ? posterPath + film.poster_path
                      : cameraIcon
                  }
                  alt={film.title}
                  style={{
                    backgroundColor: "red",
                    width: "80%",
                    objectFit: "contain",
                    borderRadius: "15px",
                    border: `1px solid ${theme.palette.primary.main}`,
                    margin: "auto",
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </section>
    </>
  );
};

export default TvShowDetails;
