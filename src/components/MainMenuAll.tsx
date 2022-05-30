import React, { createRef, useCallback } from "react";
import {
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuList,
  Button,
} from "@mui/material";
import {
  CreateNewFolderOutlined,
  Article,
  UploadFile,
  DriveFolderUpload,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import i18next from "i18next";
import { useDropzone } from "react-dropzone";
import  Dropzone from "react-dropzone";

import { test } from "../api/files";

const MainMenu: React.FC<{
  anchorEl: any;
  showMenu: boolean;
  handleClose: () => void;
}> = (props) => {
  const dir = i18next.dir(i18next.language);

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: false });

  const handleDialog = () => {
    open();
    props.handleClose();
  };

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

        <MenuItem {...getRootProps()} onClick={handleDialog} >
          <input {...getInputProps()} />
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
          <ListItemText>{`${i18next.t("mainMenu.GoogleDocs")}`}</ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon onClick={props.handleClose}>
            <Article sx={{ color: "orange" }} />
          </ListItemIcon>
          <ListItemText>{`${i18next.t("mainMenu.PDFfile")}`}</ListItemText>
        </MenuItem>

        <MenuItem onClick={props.handleClose}>
          <ListItemIcon>
            <Article sx={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText>{`${i18next.t("mainMenu.ExcelFile")}`}</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MainMenu;
