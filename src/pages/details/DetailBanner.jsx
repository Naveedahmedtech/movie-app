import { useState } from "react";
import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Modal,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Progress from "../../components/progress/Progress";

const DetailBanner = ({ data, url, video }) => {
  const [open, setOpen] = useState(false);
  const trailer = video?.results?.find((vid) => vid.type === "Trailer");
  const handleOpen = () => {
    setOpen(true);
    console.log("open");
  };
  const handleClose = () => {
    setOpen(false);
    console.log("closed");
  };

  const rating = data?.vote_average.toFixed(1);
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
  else progressColor.color = "red";

  return (
    <>
      <Box sx={{ margin: "60px 40px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card
              className="sm-grid"
              sx={{
                margin: "20px 0",
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <Box>
                <CardMedia
                  component="img"
                  id="card-image"
                  sx={{ width: "370px" }}
                  className="banner-res"
                  image={url.poster + data?.poster_path}
                  alt="Live from space album cover"
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card
              className="sm-grid"
              sx={{
                width: "100%",
                backgroundColor: "transparent",
              }}
            >
              <CardContent>
                <Typography variant="h5" className="text-white">
                  {data?.original_title}
                </Typography>
                <Typography gutterBottom sx={{ color: "gray" }}>
                  {data?.tagline}
                </Typography>
                <Typography
                  className="text-white"
                  component="span"
                  sx={{
                    padding: "5px",
                    backgroundColor: "purple",
                    fontSize: "10px",
                  }}
                >
                  {data?.status}
                </Typography>
              </CardContent>

              <CardContent sx={{ display: "flex", flexWrap: "wrap" }}>
                {data?.genres.map((gen) => (
                  <Typography className="text-white gener-m">
                    {gen.name}
                  </Typography>
                ))}
              </CardContent>

              <CardContent>
                <Progress
                  value={scaledRating}
                  color={progressColor}
                  onClick={handleOpen}
                />
                <PlayCircleOutlineIcon
                  sx={{
                    color: "white",
                    marginLeft: "20px",
                    fontSize: "45px",
                    cursor: "pointer",
                  }}
                  onClick={handleOpen}
                />
                <Typography className="text-white">Watch Trailer</Typography>
              </CardContent>

              <CardContent>
                <Typography className="text-white">
                  Overview: {data?.overview}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography className="text-white">
                  Release Date: {data?.release_date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* trailer */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-style">
          <video
            src={`https://youtube.com/watch?v=${trailer?.key}`}
            width="100%"
            height="auto"
            controls
          ></video>
        </Box>
      </Modal>
    </>
  );
};

export default DetailBanner;
