import { Button } from "@mui/material"

const SigninOut = () => {
  return (
    <>
      <Button variant="contained" size="small"
      className="res-btn"
      >
        Sign in
      </Button>
      <Button
        variant="contained"
        color="warning"
        sx={{ marginLeft: "10px" }}
        size="small"
        className="res-btn"
      >
        Sign up
      </Button>
    </>
  );
};

export default SigninOut
