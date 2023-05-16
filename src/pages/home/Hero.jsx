import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import bg from "../../assets/images/bg.jpg";
import SearchHero from "./SearchHero";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from '../../features/movieSlice';

const Hero = () => {
  const [background, setBackgroud] = useState("");
  const { url } = useSelector(movieState);
  const { data, loading } = useFetch("/movie/now_playing");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackgroud(bg);
  }, [data]);
  return (
    <>
      <Card className="hero-container">
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress size={50} />
          </Box>
        )}
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
                <SearchHero />
              </CardActions>
            </CardContent>
          </Box>
        </CardMedia>
      </Card>
    </>
  );
};

export default Hero;
