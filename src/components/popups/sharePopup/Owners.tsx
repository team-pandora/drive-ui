import React from "react";
import {
  List,
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
  IconButton,
  Avatar,
  ListItemAvatar,
  Button,
} from "@mui/material";

import { Home, Delete, Image } from "@mui/icons-material";
import i18next from "i18next";

const Owners = () => {
  return (
    <List dense={true} sx={{ width: "100%",  }}>
      <ListItemButton>
        <ListItem
          sx={{
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          <Button
            sx={{ color: "#4285f4", margin: "0px 1%", textTransform: "none" }}
          >{`${"הרשאת עריכה"}`}</Button>
        </ListItem>
      </ListItemButton>
      <ListItemButton>
        <ListItem
          sx={{
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <Image />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
          <Button
            sx={{ color: "#4285f4", margin: "0px 1%", textTransform: "none" }}
          >{`${"הרשאת עריכה"}`}</Button>
        </ListItem>
      </ListItemButton>
    </List>
  );
};

export default Owners;
