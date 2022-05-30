import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import { Dialog } from "@mui/material";
import RenamePopup from "./RenamePopup";

const RenameDialog = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.popups.rename);

  const handleClose = () => {
    dispatch(popupActions.setRename());
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { maxWidth: "650px", backgroundColor: "transparent" }, elevation: 0 }}
    >
      <RenamePopup />
    </Dialog>
  );
}

export default RenameDialog;