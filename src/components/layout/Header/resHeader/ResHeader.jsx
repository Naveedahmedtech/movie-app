import { useState, useRef, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NavLinks from "../NavLinks";
import SearchField from "../SearchField";

const ResHeader = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
    }
};

useEffect(() => {
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <>
      {open ? (
        <IconButton sx={{ cursor: "pointer" }} onClick={handleClose}>
          <CloseIcon className="menu" />
        </IconButton>
      ) : (
        <IconButton sx={{ cursor: "pointer" }} onClick={handleOpen}>
          <MenuIcon className="menu" />
        </IconButton>
      )}


      <div className="res-nav" id={open && "open-res-nav"} ref={ref}>
        <Box className="res-box">
          <NavLinks handleClose={handleClose} />
          <SearchField />
        </Box>
      </div>
    </>
  );
};

export default ResHeader;
