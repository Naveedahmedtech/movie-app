import { useState } from 'react';
import { Box } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';

const SearchHero = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleQuery = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <>
      <Box
        className="search-container hero-search-container"
        sx={{ width: "100%", marginTop: "10px" }}
      >
        <input
          type="text"
          placeholder="Search your dream movies"
          className="hero-search-field"
          value={query}
          onKeyDown={handleQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className="search-icon hero-search-icon" />
      </Box>
    </>
  );
}

export default SearchHero
