import React from "react";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import { usersActions } from "../../../store/users";
import SharePopup from "./SharePopup";
import { GenericDialog } from "../Dialog";

const ShareDialog = () => {
  const dispatch = useDispatch();
  const selectorFunction = (state: any) => state.popups.share;

  const handleClose = () => {
    dispatch(popupActions.setShare());
    console.log("close");
    dispatch(usersActions.setUsers([]));
  };

  return (
    <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
      <SharePopup/>
    </GenericDialog>
  );
};

export default ShareDialog;
