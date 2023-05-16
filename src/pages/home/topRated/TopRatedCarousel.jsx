import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "@mui/material";
import TopRatedItems from "./TopRatedItems";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from "../../../features/movieSlice";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
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

const TopRatedCarousel = ({ deviceType }) => {
  const { url } = useSelector(movieState);
  const { data, loading } = useFetch("/movie/top_rated");
  return (
    <>
      <Typography variant="h4" sx={{ color: "white", margin: "20px" }}>
        Top Rated Movies
      </Typography>
      <Carousel responsive={responsive}>
        {data?.results?.length > 0 &&
          data?.results?.map((items) => (
            <TopRatedItems key={items.id} items={items} url={url.poster} />
          ))}
      </Carousel>
    </>
  );
};

export default TopRatedCarousel;
