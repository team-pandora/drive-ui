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
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const Icons = styled(Box)(() => ({
  display: "flex",
  marginBottom: "10px",
  gap: "10px",
  alignItems: "center",
}));

const HeaderMenu = () => {
  const files = useSelector((state: any) => state.files.files);
  
  return (
    <Icons>
      {files.length > 0 && <Box>
        <IconButton>
          <InsertLink />
        </IconButton>
        <IconButton>
          <PersonAddAltOutlined />
        </IconButton>
        <IconButton>
          <RestoreOutlined />
        </IconButton>
        <IconButton>
          <DeleteOutline />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>}
      {files.length > 0 && <Divider orientation="vertical" flexItem />}
      <IconButton>
        <CalendarViewMonth />
      </IconButton>
      <IconButton>
        <InfoOutlined />
      </IconButton>
    </Icons>
  );
};

export default HeaderMenu;
