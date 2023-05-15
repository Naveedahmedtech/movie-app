import { Box } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import SigninOut from './SigninOut';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SearchField = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate();
  const handleQuery = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
      setQuery('')
    }
  };
  return (
    <>
      <Box className="search-container">
        <input
          type="text"
          placeholder="Search here.."
          className="search-field"
          value={query}
          onKeyDown={handleQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className="search-icon" />
      </Box>
       <SigninOut />
    </>
  );
};

export default SearchField
