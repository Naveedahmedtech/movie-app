import { Typography } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import { movieState } from "../../../features/movieSlice";
import ResponsiveCarousel from "../../../components/responsiveCarousel/ResponsiveCarousel";
import HomeCardItems from "../../../components/homeCardItems/HomeCardItems";
const TopRatedCarousel = ({ deviceType }) => {
  const { url } = useSelector(movieState);
  const { data } = useFetch("/movie/top_rated");
  return (
    <>
      <Typography variant="h4" sx={{ color: "white", margin: "20px" }}>
        Top Rated Movies
      </Typography>
      <ResponsiveCarousel>
        {data?.results?.length > 0 &&
          data?.results?.map((items) => (
            <HomeCardItems key={items.id} items={items} url={url.poster} />
          ))}
      </ResponsiveCarousel>
    </>
  );
};

export default TopRatedCarousel;
