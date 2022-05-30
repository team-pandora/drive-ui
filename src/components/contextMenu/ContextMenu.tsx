import React from "react";
import { Divider, Menu, MenuList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui";
import Copy from "./buttons/Copy";
import Download from "./buttons/Download";
import ExternalTransfer from "./buttons/ExternalTransfer";
import Favorite from "./buttons/Favorite";
import Info from "./buttons/Info";
import MoveTo from "./buttons/MoveTo";
import Remove from "./buttons/Remove";
import Rename from "./buttons/Rename";
import Share from "./buttons/Share";
import Shortcut from "./buttons/Shortcut";
import i18next from "i18next";

const ContextMenu = () => {
  const dir = i18next.dir(i18next.language);
  const dispatch = useDispatch();
  const contextMenu = useSelector((state: any) => state.ui.contextMenu);
  const contextMenuPosition = useSelector(
    (state: any) => state.ui.contextMenuPosition
  );
  const selectedFiles = useSelector((state: any) => state.files.files);
  
  const handleClose = () => {
    dispatch(uiActions.setContextMenu());
  };

  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      open={contextMenu}
      keepMounted={true}
      anchorEl={null}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: contextMenuPosition.y,
        left: contextMenuPosition.x,
      }}
      dir={dir}
    >
      <MenuList sx={{ width: 300 }} dense>
        <Share handleClose={handleClose} />
        <Shortcut handleClose={handleClose} />
        <MoveTo handleClose={handleClose} />
        <Favorite handleClose={handleClose} />
        <Rename handleClose={handleClose} />
        <Divider />
        <Copy handleClose={handleClose} />
        <ExternalTransfer handleClose={handleClose} />
        <Divider />
        <Info handleClose={handleClose} />
        <Download handleClose={handleClose} />
        <Divider />
        <Remove handleClose={handleClose} />
      </MenuList>
    </Menu>
  );
};

export default ContextMenu;
