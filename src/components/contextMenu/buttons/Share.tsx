import React, { Fragment } from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import i18next from "i18next";
import SharePopup from "../../popups/share";
import { useDispatch } from "react-redux";
import { popupActions } from "../../../store/popups";

const Share: React.FC<{ handleClose: () => void }> = (props) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(popupActions.setShare());
    props.handleClose();
  };

  return (
    <Fragment>
      <MenuItem onClick={handleOpen} disabled={false}>
        <ListItemIcon>
          <PersonAddAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText>{`${i18next.t("contextMenu.Share")}`}</ListItemText>
      </MenuItem>
      <SharePopup />
    </Fragment>
  );
};

export default Share;
