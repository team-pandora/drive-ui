import React from "react";
import {
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuList,
} from "@mui/material";
import {
  CreateNewFolderOutlined,
  Article,
  UploadFile,
  DriveFolderUpload,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import i18next from "i18next";

const MainMenu: React.FC<{
  anchorEl: any;
  showMenu: boolean;
  handleClose: () => void;
}> = (props) => {
  const lang = useSelector((state: any) => state.ui.language);
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={props.anchorEl}
      open={props.showMenu}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      dir={dir}
    >
      <MenuList sx={{ width: 300 }} dense>
        <MenuItem onClick={props.handleClose}>
          <ListItemIcon>
            <CreateNewFolderOutlined />
          </ListItemIcon>
          <ListItemText>{`${i18next.t("mainMenu.Folder")}`}</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={props.handleClose}>
          <ListItemIcon>
            <UploadFile />
          </ListItemIcon>
          <ListItemText>{`${i18next.t("mainMenu.UploadFiles")}`}</ListItemText>{" "}
        </MenuItem>

        <MenuItem onClick={props.handleClose}>
          <ListItemIcon>
            <DriveFolderUpload />
          </ListItemIcon>
          <ListItemText>{`${i18next.t("mainMenu.UploadFolder")}`}</ListItemText>{" "}
        </MenuItem>

        <Divider />

        <MenuItem onClick={props.handleClose}>
          <ListItemIcon>
            <Article sx={{ color: "blue" }} />
          </ListItemIcon>
          <ListItemText>Google docs</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon onClick={props.handleClose}>
            <Article sx={{ color: "orange" }} />
          </ListItemIcon>
          <ListItemText>PDF File</ListItemText>
        </MenuItem>

        <MenuItem onClick={props.handleClose}>
          <ListItemIcon>
            <Article sx={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText>Excel File</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MainMenu;
