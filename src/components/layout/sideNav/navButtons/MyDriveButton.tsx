import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

//sx={{backgroundColor: '#e8f0fe', borderRadius: '0px 25px 25px 0px'}}
import i18next from "i18next";

import { Home } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { border, borderRadius } from "@mui/system";

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

{
  /* <Typography>{`${i18next.t("sideBar.myDrive")}`}</Typography> */
}
