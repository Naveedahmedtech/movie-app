import "react-multi-carousel/lib/styles.css";
import { Typography } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from "../../../features/movieSlice";
import ResponsiveCarousel from "../../../components/responsiveCarousel/ResponsiveCarousel";
import HomeCardItems from "../../../components/homeCardItems/HomeCardItems";
const TrendingCarousel = () => {
  const { url } = useSelector(movieState);
  const { data, loading } = useFetch("/trending/all/week");
  return (
    <>
      <Typography variant="h4" sx={{ color: "white", margin: "20px" }}>
        Trending Movies
      </Typography>
      <ResponsiveCarousel>
        {data?.results.length > 0 &&
          data?.results?.map((items) => (
            <HomeCardItems key={items.id} items={items} url={url.poster} />
          ))}
      </ResponsiveCarousel>
    </>
  );
};

export default TrendingCarousel;
