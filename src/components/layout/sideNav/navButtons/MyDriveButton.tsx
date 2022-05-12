import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import i18next from "i18next";

import { Home } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const NavLinkStyle = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
});

const MyDriveButton = () => {
  return (
    <NavLinkStyle activeStyle={{ color: "#1967d2" }} to="my-drive">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          {/* <Typography> */}
            <ListItemText
              primary={`${i18next.t("sideBar.myDrive")}`}
            ></ListItemText>
          {/* </Typography> */}
        </ListItemButton>
      </ListItem>
    </NavLinkStyle>
  );
};

export default MyDriveButton;

