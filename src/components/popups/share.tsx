import React, { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../store/popups";
import ShareDialog from "./sharePopup/shareAcor";

const SharePopup = () => {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.popups.share);

  const handleClose = () => {
    dispatch(popupActions.setShare());
  };
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { maxWidth: "650px" }, elevation: 0 }}
    >
      <ShareDialog />
    </Dialog>
  );
}

export default SharePopup;