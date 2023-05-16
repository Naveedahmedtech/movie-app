import { useState, useEffect } from "react";
import { fetchMovieData } from "../../utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CarouselContainer from "../../components/carouselContainer/CarouselContainer";
import useFetch from "../../hooks/useFetch";
import CardGridItems from "../../components/cardGridItems/CardGridItems";

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
        <FormControl sx={{ m: 2, minWidth: 120 }}>
          <InputLabel id="genre-select-label">Filter</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            multiple
            value={selectedGenres}
            onChange={handleGenreChange}
            input={<OutlinedInput label="Select Genres" />}
            renderValue={(selected) =>
              selected
                .map(
                  (genreId) =>
                    genres?.genres.find((genre) => genre.id === genreId)?.name
                )
                .join(", ")
            }
            sx={{ backgroundColor: "white", color: "black" }}
          >
            {genres?.genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                <Checkbox checked={selectedGenres.indexOf(genre.id) > -1} />
                <ListItemText primary={genre.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InfiniteScroll
          className="content"
          dataLength={data?.results?.length || []}
          next={fetchData}
          hasMore={pages <= data?.total_pages}
          loader={"loading"}
        >
          <Grid container spacing={2}>
            {data?.results?.length > 0 &&
              data?.results?.map((items, index) => {
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

export default Movies;
