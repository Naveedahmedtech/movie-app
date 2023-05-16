import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";

const GenreFilter = ({ genres, selectedGenres, handleGenreChange }) => {
  return (
    <FormControl sx={{ m: 2, minWidth: 120 }}>
      <InputLabel id="genre-select-label">Filter</InputLabel>
      <Select
        labelId="genre-select-label"
        id="genre-select"
        multiple
        value={selectedGenres}
        onChange={handleGenreChange}
        input={<OutlinedInput label="Select Genres" />}
        renderValue={(selected) =>
          selected
            .map(
              (genreId) => genres?.find((genre) => genre.id === genreId)?.name
            )
            .join(", ")
        }
        sx={{ backgroundColor: "white", color: "black" }}
      >
        {genres?.map((genre) => (
          <MenuItem key={genre.id} value={genre.id}>
            <Checkbox checked={selectedGenres.indexOf(genre.id) > -1} />
            <ListItemText primary={genre.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreFilter;
