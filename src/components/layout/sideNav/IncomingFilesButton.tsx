
import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";

import { ArrowLeft, ArrowDropDown, ArrowRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import i18next from "i18next";

const NavLinkStyle = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
  borderRadius: "25px 0 0 25px",
});


const IncomingFilesButton: React.FC<{
  path: string;
  label: string;
  icon: JSX.Element;
  isOpen: boolean;
  onArrowClick: () => void;
}> = (props) => {
  const dir = i18next.dir(i18next.language) === "rtl" ? "25px 0 0 25px" : "0 25px 25px 0";

  const ArrowIcon = props.isOpen
    ? ArrowDropDown
    : i18next.dir(i18next.language) === "rtl"
    ? ArrowLeft
    : ArrowRight;


  const handleClick = (event: any) => {
    event.preventDefault();
    props.onArrowClick();
  };

  return (
    <NavLinkStyle activeStyle={{ color: "#1967d2" }} onClick={handleClick} to={props.path}>
      <ListItem
        sx={{
          marginTop: "5px",
        }}
        disablePadding
      >
        <ListItemButton
          sx={{
            borderRadius: dir,
          }}
        >
          <ListItemIcon sx={{ minWidth: "36px", marginX: "10px" }}>
            <ArrowIcon
              onClick={props.onArrowClick}
              sx={{
                marginX: "-25px",
                position: "absolute",
                color: "#5f6368",
              }}
            />
            {props.icon}
          </ListItemIcon>
          <Typography>{props.label}</Typography>
        </ListItemButton>
      </ListItem>
    </NavLinkStyle>
  );
};

export default IncomingFilesButton;

