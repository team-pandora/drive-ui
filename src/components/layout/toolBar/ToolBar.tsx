import React from "react";
import { AppBar, Toolbar, styled, Box, Typography } from "@mui/material";
import SearchBar from "./Search";
import Logo from "../Logo";
import ToolBarIcons from "./ToolBarIcons";
import { LogoIcon } from "../../../assets/LogoIcon";

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
          <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "10px",
            height: "50px",
          }}>
            <LogoIcon />
            <Typography marginTop={1} color={"black"} variant="caption">3.0</Typography>
          </Box>
          <SearchBar />
        </RightSide>
        <ToolBarIcons />
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
