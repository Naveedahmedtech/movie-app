import { Outlet } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  useMediaQuery,
  CssBaseline,
  useScrollTrigger,
  Slide,
} from "@mui/material";
import PropTypes from "prop-types";
import json2mq from "json2mq";
import Footer from "../Footer/Footer";
import SearchField from "./SearchField";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import ResHeader from "./resHeader/ResHeader";






function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
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
