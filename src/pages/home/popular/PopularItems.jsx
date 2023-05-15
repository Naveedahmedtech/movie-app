import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Progress from "../../../components/progress/Progress";
const PopularItems = ({ items, url }) => {
  const rating = items?.vote_average.toFixed(1);
  const scaleMin = 0;
  const scaleMax = 100;
  const ratingMin = 0;
  const ratingMax = 10;

  const scaledRating =
    ((rating - ratingMin) / (ratingMax - ratingMin)) * (scaleMax - scaleMin) +
    scaleMin;

  let progressColor = {
    color: "red",
  };

  if (scaledRating >= 85) progressColor.color = "green";
  else if (scaledRating < 85 && scaledRating > 60)
    progressColor.color = "orange";
  else if (scaledRating < 60) progressColor.color = "red";
  else progressColor.color = 'red'

  return (
    <>
      <Card className="card-color">
        <CardMedia
          sx={{ height: "300px" }}
          image={url + items?.poster_path}
          alt="Paella dish"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" className="text-white">
              {items.original_title}
            </Typography>
            <Typography gutterBottom component="h2" className="text-white">
              {items.overview.substring(0, 30)} ....
            </Typography>
          </CardContent>
          <CardContent>
            <Progress value={scaledRating} color={progressColor} />
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default PopularItems;
