import { Routes, Route } from "react-router-dom";
import Trending from "./components/views/trending/Trending";
import FilmDetails from "./components/views/filmDetails/FilmDetails";
import SearchGrid from "./components/views/search/SearchGrid";
import Movies from "./components/views/movies/Movies";
import TvShows from "./components/views/tvShows/TvShows";
import TvShowDetails from "./components/views/tvShowDetails/TvShowDetails";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Trending />} />
      <Route path="/filmDetails/:id" element={<FilmDetails />} />
      <Route path="/tvshowdetails/:id" element={<TvShowDetails />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tvshows" element={<TvShows />} />
      <Route path="/search" element={<SearchGrid />} />
    </Routes>
  );
};

export default MyRoutes;
