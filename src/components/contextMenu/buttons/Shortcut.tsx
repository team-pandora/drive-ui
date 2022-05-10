import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import i18next from "i18next";


const Shortcut: React.FC<{ handleClose: () => void }> = (props) => {
  return (
    <MenuItem onClick={props.handleClose}>
      <ListItemIcon>
        <AddToDriveIcon />
      </ListItemIcon>
      <ListItemText>{`${i18next.t("contextMenu.Shortcut")}`}</ListItemText>
    </MenuItem>
  );
};

export default Shortcut;
