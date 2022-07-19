import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Avatar,
  Typography,
} from "@mui/material";
import Sebastian from "../../../img/sebastian_sosa_avatar.jpg";
import React from "react";
import ComponentDiagram from "../../../img/component_diagram.png";

const About = () => {
  return (
    <>
      <CssBaseline />
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
        <Grid container my={5}>
          <Grid item xs={12} md={4}>
            <Box sx={{ width: "200px", height: "200px" }}>
              <Avatar
                src={Sebastian}
                alt="Sebastian Sosa Avatar"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h2" color="primary">
              About me
            </Typography>
            <Typography variant="body1">
              Hi! My name is Sebastian Sosa, I'm 35 years old and I'm a{" "}
              <b>Full Stack Web Developer</b>.{" "}
            </Typography>
            <Typography variant="body1">
              For most of my adult life I've been working as a <b>lifeguard</b>{" "}
              in the summers and as a <b>sound designer</b> during the rest of
              the year, being part of the Sound Department for several films,
              short films, documentaries and commercials. In the summer of
              2021-2022 I decided to change careers and pursue my newfound
              passion for web development.
            </Typography>{" "}
            <Typography variant="body1">
              So I started to learn all I could online, studying during my break
              time at the beach, celphone in hand watching the videos from{" "}
              <b>Colt Steele's Full Stack Web Developer</b> course on{" "}
              <b>Udemy</b>, which was enough to pass the entrance test for the
              <b>Coding Bootcamp at Hack Academy</b>, which was an{" "}
              <b>8 hour a day, 3 month long course</b> in which we learn the
              skills to build professional full stack web applications
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h2" color="primary">
              About the Project
            </Typography>
            <Typography variant="body1">
              This project started as an excercise from <b>Hack Academy</b>{" "}
              while going through the <b>React.js</b> part of the Bootcamp. We
              were to use <b>The Movie Database API</b> to make a{" "}
              <b>Single Page Application</b> that fetched films filtered by
              rating and by the values in a search bar. After finishing the
              Coding Bootcamp and having a bit more time on my hands I decided
              to build it again from scratch and try add more functionalities
              like fetching TV shows as well as sorting the content according to
              different criteria while also trying to make it look as
              professional as possible.
            </Typography>
            <Typography variant="body1">
              The main technologies used were <b>React.js</b> and{" "}
              <b>Material UI</b>. I decided not to use Redux because I didn't
              really see the need to if I managed to keep the component
              structure in a way that made the information flow as simple as
              posible, which I think I did.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src={ComponentDiagram} alt="" style={{ width: "100%" }} />
        </Grid>
      </Container>
    </>
  );
};

export default About;
