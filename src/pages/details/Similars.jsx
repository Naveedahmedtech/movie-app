import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Similars = ({ items, url }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/details/${items?.id}`);
  };
  return (
    <>
      <Card
        className="card-color"
        sx={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <CardMedia
          sx={{ height: "300px" }}
          image={url.poster + items?.poster_path}
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
              {items?.original_title}
            </Typography>
            <Typography gutterBottom component="h2" className="text-white">
              {items?.overview?.substring(0, 30)} ....
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default Similars;
