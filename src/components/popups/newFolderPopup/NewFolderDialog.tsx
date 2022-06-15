import React from "react";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import NewFolderPopup from "./NewFolderPopup";
import { GenericDialog } from "../Dialog";

const NewFolderDialog = () => {
  const dispatch = useDispatch();
  const selectorFunction = (state: any) => state.popups.newFolder;

  const handleClose = () => {
    dispatch(popupActions.setNewFolder());
  };
 
  return (
    <GenericDialog
      selectorFunction={selectorFunction}
      onClose={handleClose}
    >
      <NewFolderPopup/>
    </GenericDialog>
  );
};

export default NewFolderDialog;
