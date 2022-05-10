import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DownloadIcon from '@mui/icons-material/Download';
import i18next from "i18next";


const Download: React.FC<{ handleClose: () => void }> = (props) => {
  return (
    <MenuItem onClick={props.handleClose}>
      <ListItemIcon>
        <DownloadIcon />
      </ListItemIcon>
      <ListItemText>{`${i18next.t("contextMenu.Download")}`}</ListItemText>
    </MenuItem>
  );
};

export default Download;
