import React from "react";
import { Divider, Menu, MenuList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui";
import Copy from "./contextMenu/buttons/Copy";
import Download from "./contextMenu/buttons/Download";
import ExternalTransfer from "./contextMenu/buttons/ExternalTransfer";
import Favorite from "./contextMenu/buttons/Favorite";
import Info from "./contextMenu/buttons/Info";
import MoveTo from "./contextMenu/buttons/MoveTo";
import Remove from "./contextMenu/buttons/Remove";
import Rename from "./contextMenu/buttons/Rename";
import Share from "./contextMenu/buttons/Share";
import Shortcut from "./contextMenu/buttons/Shortcut";

const ContextMenu = () => {
  const dispatch = useDispatch();
  const contextMenu = useSelector((state: any) => state.ui.contextMenu);
  const contextMenuPosition = useSelector(
    (state: any) => state.ui.contextMenuPosition
  );
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? "ltr" : "rtl";

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
