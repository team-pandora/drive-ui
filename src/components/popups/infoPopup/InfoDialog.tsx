import React from "react";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import InfoPopup from "./InfoPopup";
import { GenericDialog } from "../Dialog";

const InfoDialog = () => {
  const dispatch = useDispatch();
  const selectorFunction = (state: any) => state.popups.info;

  const handleClose = () => {
    dispatch(popupActions.setInfo());
  };

  return (
    <GenericDialog
      selectorFunction={selectorFunction}
      onClose={handleClose}
    >
      <InfoPopup/>
    </GenericDialog>
  );
};

export default InfoDialog;
