import DetailBanner from "./DetailBanner";
import CreditsCast from "./CreditsCast";
import OfficialClips from "./OfficialClips";
import Similars from "./Similars";
import Recommention from "./Recommention";
import { useParams } from "react-router-dom";
import { movieState } from "../../features/movieSlice";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Typography } from "@mui/material";
const Details = () => {
  const { url } = useSelector(movieState);
  const { id } = useParams();

  const { loading, data } = useFetch(`/movie/${id}`);
  const { data: video } = useFetch(`/movie/${id}/videos`);
  const { loading: creditsLoading, data: credits } = useFetch(
    `/movie//${id}/credits`
  );
  const { loading: similarLoading, data: similar } = useFetch(
    `/movie/${id}/similar`
  );
  const { loading: recommendationLoading, data: recommendation } = useFetch(
    `/movie/${id}/recommendations`
  );
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

  return (
    <>
      <DetailBanner data={data} loading={loading} url={url} video={video} />
      <CreditsCast
        credits={credits}
        creditsLoading={creditsLoading}
        url={url}
      />
      <OfficialClips video={video} url={url}  /> 
      <Typography
        className="text-white"
        sx={{ margin: "50px 0 20px 20px" }}
        variant="h5"
      >
        Most Similar
      </Typography>
      <Carousel responsive={responsive}>
        {similar?.results?.length > 0 &&
          similar?.results?.map((items) => (
            <Similars items={items} url={url} />
          ))}
      </Carousel>
      <Typography
        className="text-white"
        sx={{ margin: "50px 0 20px 20px" }}
        variant="h5"
      >
        Top Recommendations
      </Typography>
      <Carousel responsive={responsive}>
        {recommendation?.results?.length > 0 &&
          recommendation?.results?.map((items) => (
            <Recommention items={items} url={url} />
          ))}
      </Carousel>
    </>
  );
};

export default Details;
