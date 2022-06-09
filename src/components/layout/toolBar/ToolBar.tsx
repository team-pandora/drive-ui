import React from "react";
import { AppBar, Toolbar, styled, Box, Typography } from "@mui/material";
import SearchBar from "./Search";
import ToolBarIcons from "./ToolBarIcons";
import { ReactComponent as LogoIcon } from "../../../assets/logoText.svg";

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
          <LogoIcon style={{position: "relative", height: "40px", width:"128px"}}></LogoIcon>
          <SearchBar />
        </RightSide>
        <ToolBarIcons />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
