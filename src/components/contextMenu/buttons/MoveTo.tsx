import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import i18next from "i18next";


const MoveTo: React.FC<{ handleClose: () => void }> = (props) => {
  return (
    <MenuItem onClick={props.handleClose}>
      <ListItemIcon>
        <DriveFileMoveOutlinedIcon />
      </ListItemIcon>
      <ListItemText>{`${i18next.t("contextMenu.MoveTo")}`}</ListItemText>
    </MenuItem>
  );
};

export default MoveTo;
