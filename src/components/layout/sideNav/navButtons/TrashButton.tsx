import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { Delete } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import i18next from "i18next";

const NavLinkStyle = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
});

const TrashButton = () => {
  return (
    <NavLinkStyle activeStyle={{ color: "#1967d2" }} to="/trash">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          {/* <Typography> */}
            <ListItemText
              primary={`${i18next.t("sideBar.Trash")}`}
            ></ListItemText>
          {/* </Typography> */}
        </ListItemButton>
      </ListItem>
    </NavLinkStyle>
  );
};

export default TrashButton;
