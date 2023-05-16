import { useState, useEffect } from "react";
import { fetchMovieData } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import TvItems from "./TvItems";
import { Grid, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";
const Tv = () => {
  const [data, setData] = useState(null);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchInitialSearchData = () => {
    setLoading(true);
    fetchMovieData(`/discover/tv?page=${pages}`).then((res) => {
      setData(res);
      setPages((pre) => pre + 1);
      setLoading(false);
    });
  };
  const fetchNextSearchData = () => {
    setLoading(true);
    fetchMovieData(`/discover/tv?page=${pages + 1}`).then((res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...res.results],
        });
      } else {
        setData(res);
      }
      setPages((prevPages) => prevPages + 1);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchInitialSearchData();
  }, []);

  return (
    <>
      <CarouselContainer>
        <main style={{ margin: "60px 20px" }}></main>
        {!loading && data?.results?.length < 1 && (
          <Typography
            variant="h5"
            className="text-white"
            sx={{ textAlign: "center", color: "red" }}
          >
            Opps! No Match Results
          </Typography>
        )}
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
        <InfiniteScroll
          className="content"
          dataLength={data?.results?.length || []}
          next={fetchNextSearchData}
          hasMore={pages <= data?.total_pages}
          loader={"loading"}
        >
          <Grid container spacing={2}>
            {data?.results?.length > 0 &&
              data?.results?.map((items, index) => {
                {
                  /* if (items?.media_type === "person") return; */
                }
                return (
                  <TvItems
                    key={index}
                    items={items}
                    fromSearch={true}
                    media_type={items.media_type}
                  />
                );
              })}
          </Grid>
        </InfiniteScroll>
      </CarouselContainer>
    </>
  );
};

export default Tv;
