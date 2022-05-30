import React from "react";
import {
  styled,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  Box,
} from "@mui/material";

import { useLocation } from "react-router-dom";
import { ArrowLeft, ArrowDropDown, ArrowRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import i18next from "i18next";

const NavLinkStyle = styled(NavLink)({
  textDecoration: "none",
  color: "inherit",
  borderRadius: "25px 0 0 25px",
});

const ActiveTypography = styled(Typography)({
  fontWeight: "bold",
});

const ExternalButton: React.FC<{
  path: string;
  label: string;
  icon: JSX.Element;
  isOpen: boolean;
  onArrowClick: () => void;
}> = (props) => {
  const dir = i18next.dir(i18next.language) === "rtl" ? "25px 0 0 25px" : "0 25px 25px 0";
  const ActiveListItem = styled(ListItem)({
    backgroundColor: "#e8f0fe",
    borderRadius: dir,
  });

  const ArrowIcon = props.isOpen
    ? ArrowDropDown
    : i18next.dir(i18next.language) === "rtl"
    ? ArrowLeft
    : ArrowRight;
  const location = useLocation();
  const isActive = location.pathname === `/${props.path}`;
  const ListItemComponent = isActive ? ActiveListItem : ListItem;
  const TypographyComponent = isActive ? ActiveTypography : Typography;

  return (
    <NavLinkStyle activeStyle={{ color: "#1967d2" }} to={props.path}>
      <ListItemComponent
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
          <TypographyComponent>{props.label}</TypographyComponent>
        </ListItemButton>
      </ListItemComponent>
    </NavLinkStyle>
  );
};

export default ExternalButton;
