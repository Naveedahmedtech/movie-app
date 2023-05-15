import {useState, useEffect} from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Skeleton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import bg from '../../assets/images/bg.jpg'
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from "../../features/movieSlice";
const Hero = () => {
  const [background, setBackgroud] = useState('')
  const { url } = useSelector(movieState);
  const { data, loading } = useFetch("/movie/top_rated");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackgroud(bg)
  }, [data])
  return (
    <>
      <Card className="hero-container">
        {loading ? (
          <CardMedia
            sx={{ height: "100%" }}
            image={bg}
            title="green iguana"
          />
        ) : (
          <CardMedia
            sx={{ height: "100%" }}
              image={background || bg}
            title="green iguana"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography variant="h2" className="hero-header" color="white">
                  Welcome To Watch Movies
                </Typography>
                <Typography variant="body2" color="white">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species
                </Typography>
                <CardActions>
                  <Box
                    className="search-container hero-search-container"
                    sx={{ width: "100%", marginTop: "10px" }}
                  >
                    <input
                      type="text"
                      placeholder="Search your dream movies"
                      className="hero-search-field"
                    />
                    <SearchIcon className="search-icon hero-search-icon" />
                  </Box>
                </CardActions>
              </CardContent>
            </Box>
          </CardMedia>
        )}
      </Card>
    </>
  );
};

export default Hero;
