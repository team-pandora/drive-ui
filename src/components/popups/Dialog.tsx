import React from "react";
import { Dialog, styled } from "@mui/material";
import { useSelect } from "@mui/base";
import { useSelector } from "react-redux";
import SharePopup from "./sharePopup/SharePopup";

export const GenericDialog = (props: any) => {
  const selectorFunction = props.selectorFunction;
  const show: boolean = useSelector(selectorFunction);


  return (
    <Dialog
      open={show}
      onClose={props.onClose}
      BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.435)" } }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: { minWidth: "400px", maxWidth: "650px", backgroundColor: "transparent" },
        elevation: 0,
      }}
    >
      {props.children}
    </Dialog>
  );
};
