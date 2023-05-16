import { Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import PropTypes from "prop-types";
import json2mq from "json2mq";
import SearchField from "./SearchField";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import ResHeader from "./resHeader/ResHeader";
import Footer from "../footer/Footer"


function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};



const Header = (props) => {
  const matches = useMediaQuery(
    json2mq({
      minWidth: 850,
    })
  );
  const logoRes = {
    flexGrow: 1,
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <HideOnScroll {...props}>
          <AppBar id="app-bar">
            <img src="" alt="" />
            <Toolbar>
              {matches ? (
                <>
                  <Logo />
                  <NavLinks />
                  <SearchField />
                </>
              ) : (
                <>
                  <Logo sx={logoRes} matches={matches} />
                  <ResHeader />
                </>
              )}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

export default Header;
