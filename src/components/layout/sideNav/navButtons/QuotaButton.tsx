import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { CloudQueue } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import i18next from "i18next";

const NavLinkStyle = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
});

const QuotaButton = () => {
  return (
    <NavLinkStyle to="quota">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <CloudQueue />
          </ListItemIcon>
          {/* <Typography> */}
            <ListItemText
              primary={`${i18next.t("sideBar.Storage")}`}
            ></ListItemText>
          {/* </Typography>{" "} */}
        </ListItemButton>
      </ListItem>
    </NavLinkStyle>
  );
};

export default QuotaButton;
