import { Box } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import SigninOut from './SigninOut';

const SearchField = () => {
  return (
    <>
      <Box className="search-container">
        <input
          type="text"
          placeholder="Search here.."
          className="search-field"
        />
        <SearchIcon className="search-icon" />
      </Box>
       <SigninOut />
    </>
  );
};

export default SearchField
