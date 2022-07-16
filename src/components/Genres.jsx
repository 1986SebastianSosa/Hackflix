import React, { useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@emotion/react";

const Genres = ({
  setMovies,
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
    console.log(genre);
    handleClose();
    setMovies([]);
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
    console.log("fetch genres ", data.genres);
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div>
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
        {genres.map((genre) => {
          return (
            <MenuItem
              sx={{
                backgroundColor: "background.default",
                ":hover": {
                  backgroundColor: "background.default",
                  borderBottom: `1px solid ${theme.palette.primary.main}`,
                },
              }}
              onClick={() => handleSelectGenre(genre)}
            >
              {genre.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default Genres;
