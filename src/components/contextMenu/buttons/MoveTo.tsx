import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";

import DriveFileMoveOutlinedIcon from "@mui/icons-material/DriveFileMoveOutlined";
import i18next from "i18next";
import MovePopup from "../../popups/navigationPopup/NavigationDialog";
import { useDispatch } from "react-redux";
import { popupActions } from "../../../store/popups";

const MoveTo: React.FC<{ handleClose: () => void }> = (props) => {
  const dispatch = useDispatch();

  const handleShortcutDialog = () => {
    props.handleClose();
    dispatch(popupActions.setNavigation());
  };

  return (
    <>
      <MenuItem onClick={handleShortcutDialog}>
        <ListItemIcon>
          <DriveFileMoveOutlinedIcon />
        </ListItemIcon>
        <ListItemText>{`${i18next.t("contextMenu.MoveTo")}`}</ListItemText>
      </MenuItem>
      <MovePopup></MovePopup>
    </>
  );
};

export default MoveTo;
