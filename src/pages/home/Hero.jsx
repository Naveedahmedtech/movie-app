import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Skeleton,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import bg from "../../assets/images/bg.jpg";
import SearchHero from "./SearchHero";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from "../../features/movieSlice";

const Hero = () => {
  const [background, setBackground] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { url } = useSelector(movieState);
  const { data, loading } = useFetch("/movie/now_playing");

  useEffect(() => {
    const backdrop =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(backdrop);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [data]);

  return (
    <Card className="hero-container">
      {isLoading || loading ? (
        <Box sx={{ height: "100%" }}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            height="100%"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
          />
        </Box>
      ) : (
        <CardMedia
          sx={{ height: "100%" }}
          image={background || bg}
          title="green iguana"
        >
          <Box className="hero-box">
            <CardContent>
              <Typography variant="h2" className="hero-header" color="white">
                Welcome To Watch Movies
              </Typography>
              <Typography color="white">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species
              </Typography>
              <CardActions>
                <SearchHero />
              </CardActions>
            </CardContent>
          </Box>
        </CardMedia>
      )}
    </Card>
  );
};

export default Hero;
