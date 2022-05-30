import React from "react";
import { Box, Grid, styled } from "@mui/material";
import GridHeader from "./GridHeader";
import { useDispatch, useSelector } from "react-redux";
import { filesActions } from "../../store/files";
import { uiActions } from "../../store/ui";
import ContextMenu from "../contextMenu/ContextMenu";
import i18next from "i18next";
import GridObject from "./GridObject";

const GridBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  maxHeight: 800,
  marginTop: "10px",
  overflowY: "auto",
  overflowX: "hidden",
}));

const MyDriveGrid: React.FC<{ filesArray: any[] }> = (props) => {
  const dispatch = useDispatch();
  const selectedFiles = useSelector((state: any) => state.files.files);

  const handleClick = (event: React.MouseEvent<unknown>, file: any) => {
    const selectedIndex = selectedFiles.indexOf(file.stateId);
    let newSelected: readonly string[] = [];
    if (event.ctrlKey) {
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selectedFiles, file.stateId);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selectedFiles.slice(1));
      } else if (selectedIndex === selectedFiles.length - 1) {
        newSelected = newSelected.concat(selectedFiles.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selectedFiles.slice(0, selectedIndex),
          selectedFiles.slice(selectedIndex + 1)
        );
      }

      dispatch(filesActions.setFiles(newSelected));
    } else {
      dispatch(filesActions.setFiles([file.stateId]));
    }
  };

  const handleContextMenuClick = (
    event: React.MouseEvent<unknown>,
    file: any
  ) => {
    event.preventDefault();
    if (selectedFiles.length <= 1) {
      dispatch(filesActions.setFiles([file.stateId]));
    }
    dispatch(uiActions.setContextMenu());
    dispatch(
      uiActions.setContextMenuPosition({ x: event.clientX, y: event.clientY })
    );
  };

  const isSelected = (file: any) => {
    return selectedFiles.indexOf(file.stateId) !== -1;
  };

  return (
    <GridBox>
      <GridHeader label={i18next.t("titles.Folders")} />
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 0, sm: 8, md: 15.5 }}
        >
          {props.filesArray.map((file, index) => {
            const isItemSelected = isSelected(file);
            if (file.type === "folder")
              return (
                <GridObject
                  file={file}
                  handleClick={handleClick}
                  handleContextMenu={handleContextMenuClick}
                  index={index}
                  isSelected={isItemSelected}
                />
              );
          })}
        </Grid>
      </Box>
      <br />
      <GridHeader label={i18next.t("titles.Files")} />
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 0, sm: 8, md: 15.5 }}
        >
          {props.filesArray.map((file, index) => {
            const isItemSelected = isSelected(file);
            if (file.type === "file")
              return (
                <GridObject
                  file={file}
                  handleClick={handleClick}
                  handleContextMenu={handleContextMenuClick}
                  index={index}
                  isSelected={isItemSelected}
                />
              );
          })}
        </Grid>
      </Box>
      <ContextMenu />
    </GridBox>
  );
};

export default MyDriveGrid;
