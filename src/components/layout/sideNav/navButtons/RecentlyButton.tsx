import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { QueryBuilder } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import i18next from "i18next";

const NavLinkStyle = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
});

const RecentlyButton = () => {
  return (
    <NavLinkStyle activeStyle={{ color: "#1967d2" }} to="/recently">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <QueryBuilder />
          </ListItemIcon>
            <ListItemText
              primary={`${i18next.t("sideBar.Recently")}`}
            ></ListItemText>
        </ListItemButton>
      </ListItem>
    </NavLinkStyle>
  );
};

export default RecentlyButton;
