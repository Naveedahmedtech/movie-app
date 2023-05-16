import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieData } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";
import CardGridItems from "../../components/cardGridItems/CardGridItems";
const SearchResults = () => {
  const [data, setData] = useState(null);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialSearchData = () => {
    setLoading(true);
    fetchMovieData(`/search/multi?query=${query}&page=${pages}`).then((res) => {
      setData(res);
      setPages((pre) => pre + 1);
      setLoading(false);
    });
  };
  const fetchNextSearchData = () => {
    setLoading(true);
    fetchMovieData(`/search/multi?query=${query}&page=${pages + 1}`).then(
      (res) => {
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
      }
    );
  };

  useEffect(() => {
    fetchInitialSearchData();
  }, [query]);

  return (
    <>
      <CarouselContainer>
        <main style={{ margin: "60px 20px" }}>
          <Typography variant="h5" className="text-white">
            {`Search ${
              data?.results?.length > 1 ? "results" : "result"
            } ${query}`}
          </Typography>
        </main>
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
          <Box className="loading-box">
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
                }
                return (
                  <CardGridItems
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

export default SearchResults;
