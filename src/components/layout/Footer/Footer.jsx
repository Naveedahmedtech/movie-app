import { Typography, Box } from "@mui/material";
const Footer = () => {
  return (
    <>
      <Box className="footer-box">
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
