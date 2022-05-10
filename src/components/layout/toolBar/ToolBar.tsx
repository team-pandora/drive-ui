import React from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import SearchBar from "./Search";
import Logo from "../Logo";
import ToolBarIcons from "./ToolBarIcons";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "white",
});

const RightSide = styled(Box)({
  width: "880px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Navbar = () => {
  return (
    <AppBar
      sx={{ boxShadow: "none", borderBottom: "solid 1px lightgray" }}
      position="sticky"
    >
      <StyledToolbar>
        <RightSide>
          <Logo />
          <SearchBar />
        </RightSide>
        <ToolBarIcons />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
