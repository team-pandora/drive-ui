import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";

import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import ShortcutPopup from "../../popups/navigationPopup/NavigationDialog";
import i18next from "i18next";
import { useDispatch } from "react-redux";
import { popupActions } from "../../../store/popups";

const Shortcut: React.FC<{ handleClose: () => void }> = (props) => {
  const dispatch = useDispatch();

  const handleShortcutDialog = () => {
    props.handleClose();
    dispatch(popupActions.setNavigation());
  };

  return (
    <>
      <MenuItem onClick={handleShortcutDialog}>
        <ListItemIcon>
          <AddToDriveIcon />
        </ListItemIcon>
        <ListItemText>{`${i18next.t("contextMenu.Shortcut")}`}</ListItemText>
      </MenuItem>
      <ShortcutPopup />
    </>
  );
};

export default Shortcut;
