import React from "react";
import {
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import i18next from "i18next";


const Info: React.FC<{ handleClose: () => void }> = (props) => {
  return (
    <MenuItem onClick={props.handleClose}>
      <ListItemIcon>
        <InfoOutlinedIcon />
      </ListItemIcon>
      <ListItemText>{`${i18next.t("contextMenu.Info")}`}</ListItemText>
    </MenuItem>
  );
};

export default Info;
