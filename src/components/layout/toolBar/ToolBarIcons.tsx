import React from "react";
import UserAvatar from "../Avatar";
import { Box, styled, IconButton } from "@mui/material";
import { SettingsOutlined, HelpOutlineOutlined, ModeNight } from "@mui/icons-material";
import getRandomColor from "../../../utils/functions";
import UserSettings from "./Settings";

const userColor = getRandomColor();

const Icons = styled(Box)(() => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

const ToolBarIcons = () => {

  const name = "John Doe";

  return (
    <Icons>
      {/* <IconButton>
        <ModeNight sx={{ color: "#5f6368" }} />
      </IconButton> */}
      <IconButton> 
        <UserSettings/>
      </IconButton>
      <IconButton>
        <HelpOutlineOutlined sx={{ color: "#5f6368" }} />
      </IconButton>
      <UserAvatar name={name} color={userColor}/>
    </Icons>
  );
};

export default ToolBarIcons;
