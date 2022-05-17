import React from 'react';
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { PeopleAlt } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import i18next from "i18next";

const NavLinkStyle = styled(NavLink)({
    textDecoration: "none",
    color: "inherit",
    borderRadius: "25px",
  })

const SharedButton = () => {
    return (
        <NavLinkStyle activeStyle={{ color: "#1967d2"}} to="/shared">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
            <PeopleAlt />
            </ListItemIcon>
            <ListItemText
              primary={`${i18next.t("sideBar.SharedWithMe")}`}
            ></ListItemText>
          </ListItemButton>
        </ListItem>
      </NavLinkStyle>
    );
};

export default SharedButton;