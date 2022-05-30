import React, { Fragment } from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { popupActions } from "../../../store/popups";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import RenamePopup from "../../popups/renamePopup/RenameDialog";
import i18next from "i18next";

const Rename: React.FC<{ handleClose: () => void }> = (props) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(popupActions.setRename());
    props.handleClose();
  };

  return (
    <Fragment>
      <MenuItem onClick={handleOpen} disabled={false}>
        <ListItemIcon>
          <BorderColorOutlinedIcon />
        </ListItemIcon>
        <ListItemText>{`${i18next.t("contextMenu.Rename")}`}</ListItemText>
      </MenuItem>
        <RenamePopup />
    </Fragment>
  );
};

export default Rename;
