import Slider from "react-slick";
import {
  Alert,
  Box,
  Button,
  CssBaseline,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import ContentLoader from "react-content-loader";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useNavigate } from "react-router-dom";
import Logo from "../../../img/Logos/logo_transparent_edited_4.png";
import { Container } from "@mui/system";

const HeaderCarousel = ({ trending }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const imgPath = process.env.REACT_APP_IMG_BACKDROP;
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const query600 = useMediaQuery("(min-width: 600px)");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

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
                <>
                  <Container>
                    <Box
                      sx={{
                        position: "absolute",
                        top: { md: "50vh", xs: "20vh" },
                        zIndex: "100",
                        color: "white",
                        fontSize: "1.1rem",
                        textAlign: "left",
                      }}
                    >
                      <Box
                        sx={{ width: { xs: "1rem", sm: "1.5rem", md: "2rem" } }}
                      >
                        <img
                          src={Logo}
                          alt="film.title"
                          style={{
                            width: "100%",
                            display: "inline",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h2"
                        sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
                      >
                        {film.title}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Button
                          onClick={handleClick}
                          variant="contained"
                          sx={{
                            fontSize: { xs: "18px", md: "1.1rem" },
                            fontWeight: "600",
                            color: "white",
                            backgroundColor: "rgba(252, 163, 17,0.8)",
                            mr: 2,
                          }}
                        >
                          <PlayArrowIcon
                            fontSize={query600 ? "large" : "small"}
                          />
                          Play
                        </Button>
                        <Snackbar
                          open={open}
                          autoHideDuration={3500}
                          onClose={handleClose}
                        >
                          <Alert
                            onClose={handleClose}
                            severity="info"
                            sx={{ width: { xs: "360px", sm: "100%" } }}
                          >
                            This functionality is beyond the scope of this
                            project
                          </Alert>
                        </Snackbar>
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
                          <InfoOutlinedIcon
                            fontSize={query600 ? "large" : "small"}
                            sx={{ mr: 1 }}
                          />
                          More Info
                        </Button>
                      </Box>
                    </Box>
                  </Container>

                  <Box key={film.id}>
                    <Box
                      className="headerImage"
                      width="100%"
                      height={{ xs: "50vh", md: "85vh" }}
                      minHeight="50vh"
                      margin="auto"
                      textAlign="center"
                      sx={{
                        background: `center linear-gradient(to top, transparent 80%, #181818), linear-gradient(to bottom, transparent 80%, #181818), url(${
                          imgPath + film.backdrop_path
                        })`,
                        opacity: "0.6",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        zIndex: "-100",
                      }}
                    ></Box>
                  </Box>
                </>
              );
            })}
          </Slider>
        </>
      )}
    </>
  );
};

export default HeaderCarousel;
