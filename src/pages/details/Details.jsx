import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { movieState } from "../../features/movieSlice";
import { fetchMovieData } from "../../utils/api";
import { useSelector } from "react-redux";
import { ItemDescription } from "semantic-ui-react";

const Details = () => {
  const [data, setData] = useState(null);
  const { url } = useSelector(movieState);
  const { id } = useParams();

  const fetchData = () => {
    fetchMovieData(`/movie/${id}`).then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ margin: "60px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Card
              className="sm-grid"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0",
                width: "100%",
                textDecoration: "none",
                backgroundColor: 'transparent',
              }}
            >
              <Box>

              <CardMedia
                component="img"
                id="card-image"
                sx={{ width: '50%' }}
                image={url.poster + data?.poster_path}
                alt="Live from space album cover"
              />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", width: '50%' }}>
                <CardContent sx={{ flex: "1 0 auto" }}>

                </CardContent>
              </Box>

            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Details;
