import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { movieState } from "../../features/movieSlice";
import { useSelector } from "react-redux";
import bg from "../../assets/images/bg.jpg";
import { useNavigate } from "react-router-dom";
const TvItems = ({ items, fromSearch }) => {
  const navigate = useNavigate();
  const { url } = useSelector(movieState);
  const isPostImage = url?.poster + items?.poster_path || bg;

  const handleClick = () => {
    navigate(`/details/${items?.id}`);
  };
  return (
    <>
      <Grid
        item
        xs={12}
        md={6}
        lg={3}
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <Card className="card-color">
          <CardMedia
            sx={{ height: "300px" }}
            image={isPostImage}
            alt="Paella dish"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                className="text-white"
                component="h2"
              >
                {items?.title || items?.name}
              </Typography>
              <Typography gutterBottom component="h2" className="text-white">
                {items?.overview?.substring(0, 30) || "No Descirption"} ....
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default TvItems;
