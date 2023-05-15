import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
const Logo = ({sx, matches}) => {
  return (
    <>
      <Typography
        variant="h6"
        component={NavLink}
        to="/"
        className="header-link"
        sx={!matches ? sx : ''}
      >
        Watch Movies
      </Typography>
    </>
  );
}

export default Logo
