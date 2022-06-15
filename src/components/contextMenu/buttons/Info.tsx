import React from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { popupActions } from "../../../store/popups";
import InfoPopup from "../../popups/infoPopup/InfoDialog";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import i18next from "i18next";

const Info: React.FC<{ handleClose: () => void }> = (props) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(popupActions.setInfo());
    props.handleClose();
  };

  const selectedFiles = useSelector((state: any) => state.files.files);

  return (
    <>
      <MenuItem onClick={handleOpen} disabled={false}>
        <ListItemIcon>
          <InfoOutlinedIcon />
        </ListItemIcon>
        <ListItemText>{`${i18next.t("contextMenu.Info")}`}</ListItemText>
      </MenuItem>
      <InfoPopup />
    </>
  );
};

export default Info;
