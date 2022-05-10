import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import i18next from "i18next";


const Copy: React.FC<{ handleClose: () => void }> = (props) => {
  return (
    <MenuItem onClick={props.handleClose}>
      <ListItemIcon>
        <ContentCopyIcon />
      </ListItemIcon>
      <ListItemText>{`${i18next.t("contextMenu.Copy")}`}</ListItemText>
    </MenuItem>
  );
};

export default Copy;
