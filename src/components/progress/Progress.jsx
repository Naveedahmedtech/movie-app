import { Typography, Box, CircularProgress } from "@mui/material";

const Progress = ({ value, color }) => {
  function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" component="div" className="text-white">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
    <>
      <CircularProgressWithLabel sx={color} value={value} />
    </>
  );
};

export default Progress;
