import React, { useState, Fragment } from "react";
import {
  styled,
  Avatar,
  MenuItem,
  Menu,
  ListItemIcon,
  Divider,
  ListItemText,
  ListItem,
  Typography,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import Flags from "country-flag-icons/react/3x2";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import i18next from "i18next";

const AvatarIcon = styled(Avatar)({
  width: "32px",
  height: "32px"
});

const AvatarIconFull = styled(Avatar)({
  width: "80px",
  height: "80px",
  fontSize: "64px"
});

function stringAvatar(name: string, color: string) {
  return {
    sx: {
      bgcolor: `${color}`,
    },
    children: name[0],
  };
}

const UserAvatar: React.FC<{ name: string; color: string }> = (props) => {
  const dispatch = useDispatch();
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
    setShowAvatarMenu(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShowAvatarMenu(true);
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <AvatarIcon {...stringAvatar(props.name, props.color)} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={showAvatarMenu}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <ListItem>
          <AvatarIconFull {...stringAvatar(props.name, props.color)} sx={{margin: "auto", bgcolor: props.color}}/>
        </ListItem>
        <ListItem sx={{display: "block", textAlign: "center"}}>
          <Typography sx={{fontWeight: "500", color:"#202124"}}>{props.name}</Typography>
          <Typography sx={{fontSize:"small", color:'#5f6368'}}>Example@gmagdfgdgil.com</Typography>
        </ListItem>
      </Menu>
    </Fragment>
  );
};

export default UserAvatar;
