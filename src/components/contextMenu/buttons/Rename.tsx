import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import i18next from "i18next";


const Rename: React.FC<{ handleClose: () => void }> = (props) => {
  return (
    <MenuItem onClick={props.handleClose}>
      <ListItemIcon>
        <BorderColorOutlinedIcon />
      </ListItemIcon>
      <ListItemText>{`${i18next.t("contextMenu.Rename")}`}</ListItemText>
    </MenuItem>
  );
};

export default Rename;
