import React from "react";
import { Box, styled, IconButton, Divider } from "@mui/material";
import {
  InfoOutlined,
  CalendarViewMonth,
  MoreVert,
  DeleteOutline,
  PersonAddAltOutlined,
  InsertLink,
  RestoreOutlined,
  Toc,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import ContextMenu from "./contextMenu/ContextMenu";
import { useDispatch } from "react-redux";
import { uiActions } from '../store/ui';
import { popupActions } from "../store/popups";

const Icons = styled(Box)(() => ({
  display: "flex",
  marginBottom: "10px",
  gap: "10px",
  alignItems: "center",
}));

const MoreVertClick = () => {
  console.log("MoreVertClick");
}

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const isGridView = useSelector((state: any) => state.ui.isGridView);
  const files = useSelector((state: any) => state.files.files);

  const isGridViewClick = () => {
    dispatch(uiActions.toggleGridView());
    console.log("isGridViewClick");
  }

  const handleInfoOpen = () => {
    dispatch(popupActions.setInfo());
  }

  const handleShareOpen = () => {
    dispatch(popupActions.setShare());
  }

  return (
    <Icons>
      {files.length > 0 && (
        <Box
          sx={{
            display: "flex",
          }}
        >
          <IconButton>
            <InsertLink onClick={handleShareOpen}/>
          </IconButton>
          <IconButton>
            <PersonAddAltOutlined onClick={handleShareOpen}/>
          </IconButton>
          <IconButton>
            <RestoreOutlined />
          </IconButton>
          <IconButton>
            <DeleteOutline />
          </IconButton>
          <IconButton>
            <MoreVert onClick={MoreVertClick} />
          </IconButton>
        </Box>
      )}
      {files.length > 0 && <Divider orientation="vertical" flexItem />}
      <IconButton>
        {!isGridView && <CalendarViewMonth onClick={isGridViewClick} />}
        {isGridView && <Toc onClick={isGridViewClick} />}
      </IconButton>
      <IconButton>
        <InfoOutlined onClick={handleInfoOpen}/>
      </IconButton>
    </Icons>
  );
};

export default HeaderMenu;
