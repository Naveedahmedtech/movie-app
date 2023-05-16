import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";
import useFetch from "../../hooks/useFetch";
import CardGridItems from "../../components/cardGridItems/CardGridItems";
import GenreFilter from "../../components/genreFilter/GenreFilter";
import { fetchMovieData } from "../../utils/api";

const Movies = () => {
  const [data, setData] = useState(null);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { data: genres } = useFetch("/genre/movie/list");

  const fetchData = () => {
    setLoading(true);
    const genreQuery =
      selectedGenres.length > 0
        ? `&with_genres=${selectedGenres.join(",")}`
        : "";
    fetchMovieData(`/discover/movie?page=${pages + 1}${genreQuery}`).then(
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

  const handleGenreChange = (event) => {
    setSelectedGenres(event.target.value);
    setPages(1);
    setData(null);
  };

  useEffect(() => {
    fetchData();
  }, [selectedGenres]);

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
            Oops! No Match Results
          </Typography>
        )}
        {loading && (
          <Box className="loading-box">
            <CircularProgress size={50} />
          </Box>
        )}
        {!loading && (
          <>
            <GenreFilter
              genres={genres?.genres}
              selectedGenres={selectedGenres}
              handleGenreChange={handleGenreChange}
            />
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || 0}
              next={fetchData}
              hasMore={pages <= data?.total_pages}
              loader={<div>Loading...</div>}
            >
              <Grid container spacing={2}>
                {data?.results?.length > 0 &&
                  data?.results?.map((items, index) => (
                    <CardGridItems
                      key={index}
                      items={items}
                      fromSearch={true}
                      media_type={items.media_type}
                    />
                  ))}
              </Grid>
            </InfiniteScroll>
          </>
        )}
      </CarouselContainer>
    </>
  );
};

export default Movies;
