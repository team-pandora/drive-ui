import React from "react";
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import NavigationPopup from "./NavigationPopup";
import { GenericDialog } from "../Dialog";

const NavigationDialog = () => {
  const dispatch = useDispatch();
  const selectorFunction = (state: any) => state.popups.navigation;

  const handleClose = () => {
    dispatch(popupActions.setNavigation());
  };

  return (
    <GenericDialog selectorFunction={selectorFunction} onClose={handleClose}>
      <NavigationPopup />
    </GenericDialog>
  );
};

export default NavigationDialog;
