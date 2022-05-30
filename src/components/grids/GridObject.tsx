import React from "react";
import { Box, Grid, styled } from "@mui/material";
import { Folder, InsertDriveFile } from "@mui/icons-material";
import GridTitle from "./GridTitle";

const FolderItem = styled(Box)(() => ({
  backgroundColor: "gray.100",
  width: "200px",
  height: "45px",
  display: "flex",
  alignItems: "center",
  borderRadius: "5px",
  border: "1px solid #dadce0",
}));

const FolderActiveItem = styled(Box)(() => ({
  backgroundColor: "#e8f0fe",
  width: "200px",
  height: "45px",
  display: "flex",
  alignItems: "center",
  color: "#185abc", //none if not active
  borderRadius: "5px",
  border: "1px solid #dadce0",
}));

const FileItem = styled(Box)(() => ({
  backgroundColor: "gray.100",
  width: "200px",
  height: "220px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "5px",
  border: "1px solid #dadce0",
}));

const FileActiveItem = styled(Box)(() => ({
  backgroundColor: "#e8f0fe",
  width: "200px",
  height: "220px",
  display: "flex",
  flexDirection: "column",
  color: "#185abc",
  borderRadius: "5px",
  border: "1px solid #dadce0",
}));

const iconStyle = {
  color: "rgb(95, 99, 104)",
  padding: "0px 15px",
};

const GridObject: React.FC<{
  file: any;
  isSelected: boolean;
  index: number;
  handleClick: (event: any, file: any) => void;
  handleContextMenu: (event: any, file: any) => void;
}> = (props) => {
  const icon =
    props.file.type === "folder" ? (
      <Folder sx={iconStyle} />
    ) : (
      <InsertDriveFile sx={iconStyle} />
    );
  const ItemComponent =
    props.file.type === "folder"
      ? props.isSelected
        ? FolderActiveItem
        : FolderItem
      : props.isSelected
      ? FileActiveItem
      : FileItem;

  return (
    <Grid item xs={2} sm={2} md={2} key={props.index}>
      <ItemComponent
        onClick={(event) => props.handleClick(event, props.file)}
        onContextMenu={(event) => props.handleContextMenu(event, props.file)}
      >
        {props.file.type === "file" && (
          <Box
            sx={{
              width: "100%",
              height: "75%",
              backgroundColor: "#dadce0",
            }}
          ></Box>
        )}
        <GridTitle fileName={props.file.name} icon={icon} />
      </ItemComponent>
    </Grid>
  );
};

export default GridObject;
