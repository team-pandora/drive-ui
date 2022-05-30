import React from "react";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import { usersActions } from "../../../store/users";
import SharePopup from "./SharePopup";

const ShareDialog = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.popups.share);

  const handleClose = () => {
    dispatch(popupActions.setShare());
    console.log("close");
    dispatch(usersActions.setUsers([]));
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { maxWidth: "650px", backgroundColor: "transparent" }, elevation: 0 }}
    >
      <SharePopup />
    </Dialog>
  );
}

export default ShareDialog;