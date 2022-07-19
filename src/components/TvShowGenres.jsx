import React, { useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";

const TvShowGenres = ({
  setTvShows,
  setPage,
  genres,
  setGenres,
  setSelectedGenre,
  type,
}) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const apiKey = process.env.REACT_APP_TMDB_KEY;
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectGenre = (genre) => {
    handleClose();
    setTvShows([]);
    setPage(1);
    setSelectedGenre(genre.id);
  };

  const fetchGenres = async () => {
    const { data } = await axios({
      method: "get",
      baseURL: baseURL,
      url: `/genre/${type}/list`,
      params: { api_key: apiKey },
    });
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div>
      <Typography variant="span" mr={2} fontSize="1.6rem">
        Sort by:
      </Typography>
      <Button
        sx={{ my: 5, color: "text.primary" }}
        id="demo-positioned-button"
        variant="outlined"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Genres <ArrowDropDownIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Grid container width={{ maxWidth: "600px", xs: "100%" }}>
          {genres.map((genre, index) => {
            return (
              <Grid
                key={index}
                item
                onClick={() => handleSelectGenre(genre)}
                xs={12}
                sm={6}
                md={4}
                textAlign="center"
                fontSize={20}
                py="5px"
                px="10px"
                color="text.secondary"
                sx={{
                  transition: "0.2s",
                  ":hover": {
                    cursor: "pointer",
                    transform: "scale(1.2)",
                    boxShadow:
                      "0px 1px 2px -1px rgba(0, 0, 0, 0.2),0px 2px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);",
                  },
                }}
              >
                {genre.name}
              </Grid>

              // <MenuItem
              //   sx={{
              //     backgroundColor: "background.default",
              //     ":hover": {
              //       backgroundColor: "background.default",
              //       borderBottom: `1px solid ${theme.palette.primary.main}`,
              //     },
              //   }}
              //   onClick={() => handleSelectGenre(genre)}
              // >
              //   {genre.name}
              // </MenuItem>
            );
          })}
        </Grid>
      </Menu>
    </div>
  );
};

export default TvShowGenres;
