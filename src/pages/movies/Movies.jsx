import { useState, useEffect, useRef } from "react";
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
  const scrollRef = useRef(null);
  const prevScrollPosition = useRef(0);

  const fetchNextPageData = () => {
    setLoading(true);
    const genreQuery =
      selectedGenres.length > 0
        ? `&with_genres=${selectedGenres.join(",")}`
        : "";
    fetchMovieData(`/discover/movie?page=${pages + 1}${genreQuery}`).then(
      (res) => {
        setData((prevData) => ({
          ...prevData,
          results: [...prevData.results, ...res.results],
        }));
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

  const fetchInitialData = () => {
    setLoading(true);
    const genreQuery =
      selectedGenres.length > 0
        ? `&with_genres=${selectedGenres.join(",")}`
        : "";
    fetchMovieData(`/discover/movie?page=1${genreQuery}`).then((res) => {
      setData(res);
      setPages(1);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchInitialData();
  }, [selectedGenres]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, prevScrollPosition.current);
    }
  }, [data]);

  const handleScroll = () => {
    prevScrollPosition.current = scrollRef.current.scrollTop;
  };

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
        <GenreFilter
          genres={genres?.genres}
          selectedGenres={selectedGenres}
          handleGenreChange={handleGenreChange}
        />
        <InfiniteScroll
          className="content"
          dataLength={data?.results?.length || 0}
          next={fetchNextPageData}
          hasMore={pages < data?.total_pages}
          loader={<div>Loading...</div>}
          scrollableTarget="scrollable-element"
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
      </CarouselContainer>
    </>
  );
};

export default Movies;
