import { Avatar, Box, Typography } from "@mui/material";

const CreditsCast = ({ credits, url }) => {
  return (
    <>
      <main style={{ margin: "40px" }}>
        <Typography className="text-white" variant="h5">
          Top Casts
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: '10px' }}>
          {credits?.cast?.length > 0 &&
            credits?.cast?.slice(0, 6)?.map((credit) => (
              <Box key={credit?.id}>
                <Avatar
                  sx={{ width: "150px", height: "150px" }}
                  className="avatar-m"
                  alt="C"
                  src={url.profile + credit?.profile_path}
                />
                <Typography align="center" className="text-white">
                  {credit?.character}
                </Typography>
              </Box>
            ))}
        </Box>
      </main>
    </>
  );
};

export default CreditsCast;
