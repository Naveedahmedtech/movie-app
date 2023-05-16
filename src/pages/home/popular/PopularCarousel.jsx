import "react-multi-carousel/lib/styles.css";
import { Typography } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from "../../../features/movieSlice";
import ResponsiveCarousel from "../../../components/responsiveCarousel/ResponsiveCarousel";
import HomeCardItems from "../../../components/homeCardItems/HomeCardItems";
const PopularCarousel = () => {
  const { url } = useSelector(movieState);
  const { data, loading } = useFetch("/movie/popular");
  return (
    <>
      <Typography variant="h4" sx={{ color: "white", margin: "20px" }}>
        Popular Movies
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

export default PopularCarousel;
