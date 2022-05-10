import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { StarBorder } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import i18next from "i18next";

const NavLinkStyle = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
});

const FavoritesButton = () => {
  return (
    <NavLinkStyle activeStyle={{ color: "#1967d2" }} to="/favorites">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          {/* <Typography> */}
            <ListItemText
              primary={`${i18next.t("sideBar.Favorites")}`}
            ></ListItemText>
          {/* </Typography> */}
        </ListItemButton>
      </ListItem>
    </NavLinkStyle>
  );
};

export default FavoritesButton;
