import React from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";
const NavLinks = ({ handleClose }) => {
  const activeLinks = {
    color: "red",
    textDecoration: "underline",
  };
  return (
    <>
      <Box className="res-links" sx={{ flexGrow: 1, }}>
        <NavLink
          to="home"
          className="links"
          style={({ isActive }) => (isActive ? activeLinks : {})}
          onClick={handleClose}
        >
          Home
        </NavLink>
        <NavLink
          to="movies"
          className="links"
          style={({ isActive }) => (isActive ? activeLinks : {})}
          onClick={handleClose}
        >
          Movie
        </NavLink>
        <NavLink
          to="tv"
          className="links"
          style={({ isActive }) => (isActive ? activeLinks : {})}
          onClick={handleClose}
        >
          Tv
        </NavLink>
      </Box>
    </>
  );
};

export default NavLinks;
