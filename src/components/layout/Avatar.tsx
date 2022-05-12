import React, { useState, Fragment } from "react";
import { styled, Avatar, MenuItem, Menu, ListItemIcon, Divider, ListItemText} from "@mui/material";
import { IconButton } from "@mui/material";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import Flags from "country-flag-icons/react/3x2";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import i18next from "i18next";

const AvatarIcon = styled(Avatar)({
  width: "32px",
  height: "32px",
});

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: "pink",
    },
    children: name[0],
  };
}

const UserAvatar: React.FC<{ name: string }> = (props) => {
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

  const selectEnglish = () => {
    dispatch(uiActions.setLanguage("en"));
    i18next.changeLanguage("en");
  }

  const selectHebrew = () => {
    dispatch(uiActions.setLanguage("he"));
    i18next.changeLanguage("he");
  }

  return (
    <Fragment>
    <IconButton onClick={handleClick}>
      <AvatarIcon {...stringAvatar(props.name)} />
    </IconButton>
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={showAvatarMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={selectEnglish}>
        <ListItemIcon>
        <Flags.US width={30} title="United States" className="..." /> 
          </ListItemIcon>
        <ListItemText>English</ListItemText>
        </MenuItem>

        <MenuItem onClick={selectHebrew}>
        <ListItemIcon>
        <Flags.IL width={30} title="Israel" className="..." />
          </ListItemIcon>
        <ListItemText>Hebrew</ListItemText>

        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserAvatar;
