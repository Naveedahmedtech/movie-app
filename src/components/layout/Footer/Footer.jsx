import { Typography, Box } from "@mui/material";
import Divider from "@mui/joy/Divider";
import { BorderTop } from "@mui/icons-material";
const Footer = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          backgroundColor: "black",
          margin: "20px",
          color: "white",
          marginTop: '20px',
          padding: '10px 0',
          borderTop: "1px solid white"
        }}
      >

        <Typography
          level="body2"
          startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        >
          Watch Moives
        </Typography>

        <Typography level="body3" sx={{ ml: "auto" }}>
          Copyright 2022
        </Typography>
      </Box>
    </>
  );
}

export default Footer
