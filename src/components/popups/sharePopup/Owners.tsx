import React, { Fragment } from "react";
import {
  List,
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Stack,
  Box,
  Typography,
  IconButton,
  // Avatar,
  ListItemAvatar,
  Button,
} from "@mui/material";

import { Home, Delete, Image, ArrowDropDown } from "@mui/icons-material";
import i18next from "i18next";
import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "../../layout/Avatar";
import getRandomColor from "../../../utils/randomColor";
import PermissionMenu from './PermissionMenu';

const users = [
  {
    name: "מאיה פישר (את/ה)",
    email: "maya.fisher53@gmail.com",
    permission: "owner",
    color: getRandomColor(),
  },
  {
    name: "ירין בניסטי",
    email: "yarin.benisty@gmail.com",
    permission: "read",
    color: getRandomColor(),
  },
  {
    name: "עומר שטרן",
    email: "omer.shtern@gmail.com",
    permission: "write",
    color: getRandomColor(),
  },
  {
    name: "רוני גז",
    email: "roni.gez@gmail.com",
    permission: "write",
    color: getRandomColor(),
  },
  {
    name: "ליאור פרץ",
    email: "lior.horse@gmail.com",
    permission: "write",
    color: getRandomColor(),
  },
  {
    name: "גל גבע",
    email: "gal.geva@gmail.com",
    permission: "write",
    color: getRandomColor(),
  },
  {
    name: "עומר שטרן",
    email: "omer.shtern@gmail.com",
    permission: "write",
    color: getRandomColor(),
  },
];

const Owners = () => {
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <Box
      marginTop={2.5}
      sx={{
        maxHeight: "200px",
        overflowY: `${users.length > 5 ? "scroll" : "hidden"}`,
      }}
    >
      {users.map((user) => {
        return (
          <Box
            sx={{
              direction: `${dir}`,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <UserAvatar name={user.name} color={user.color} />
            <ListItemText>
              <Typography variant="body2">{user.name}</Typography>
              <Typography variant="caption">{user.email}</Typography>
            </ListItemText>

            {/* {user.permission !== 'owner' && <PermissionMenu></PermissionMenu>} */}

            {/* <Box
              sx={{
                width: "130px",
                display: "flex",
                alignItems: "center",
              }}
            > */}
              {user.permission !== "owner" && (
                <PermissionMenu/>
                // <Button
                //   sx={{
                //     color: "gray",
                //     margin: "0px 1%",
                //     textTransform: "none",
                //   }}
                // >
                //   {`${"הרשאת עריכה"}`}
                //   <ArrowDropDown />
                // </Button>
              )}
            {/* </Box> */}

            {user.permission === "owner" && (
              <Typography
                sx={{
                  margin: "0px 2%",
                  color: "lightgrey",
                }}
              >
                {"בעלים"}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Owners;
