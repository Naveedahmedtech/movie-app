import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "@mui/material";
import TrendingItems from "./TrendingItems";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from "../../../features/movieSlice";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const TrendingCarousel = ({ deviceType }) => {
  const { url } = useSelector(movieState);
  const { data, loading } = useFetch("/trending/all/week");
  return (
    <>
      <Typography variant="h4" sx={{ color: "white", margin: "20px" }}>
        Trending Movies
      </Typography>
      <Carousel responsive={responsive}>
        {data?.results.length > 0 && data?.results?.map((items) => (
          <TrendingItems key={items.id} items={items} url={url.poster} />
        ))}
      </Carousel>
    </>
  );
};

export default TrendingCarousel;
