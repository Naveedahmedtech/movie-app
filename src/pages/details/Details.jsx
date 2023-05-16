import DetailBanner from "./DetailBanner";
import CreditsCast from "./CreditsCast";
import OfficialClips from "./OfficialClips";
import { useParams } from "react-router-dom";
import { movieState } from "../../features/movieSlice";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import HomeCardItems from "../../components/homeCardItems/HomeCardItems";
import { Typography } from "@mui/material";
import ResponsiveCarousel from '../../components/responsiveCarousel/ResponsiveCarousel'

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


  return (
    <>
      <DetailBanner data={data} loading={loading} url={url} video={video} />
      <CreditsCast
        credits={credits}
        creditsLoading={creditsLoading}
        url={url}
      />
      <OfficialClips video={video} url={url} />
      <Typography
        className="text-white"
        sx={{ margin: "50px 0 20px 20px" }}
        variant="h5"
      >
        Most Similar
      </Typography>
      <ResponsiveCarousel>
        {similar?.results?.length > 0 &&
          similar?.results?.map((items) => (
            <HomeCardItems items={items} url={url.poster} />
          ))}
      </ResponsiveCarousel>
      <Typography
        className="text-white"
        sx={{ margin: "50px 0 20px 20px" }}
        variant="h5"
      >
        Top Recommendations
      </Typography>
      <ResponsiveCarousel>
        {recommendation?.results?.length > 0 &&
          recommendation?.results?.map((items) => (
            <HomeCardItems items={items} url={url.poster} />
          ))}
      </ResponsiveCarousel>
    </>
  );
};

export default Details;
