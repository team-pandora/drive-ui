import React from "react";
import { Box } from "@mui/material";

import Quota from "./Quota";
import AddButton from "./AddButton";
import PagesButtons from "./PagesButtons";
import { useDispatch } from "react-redux";
import { filesActions } from "../../../store/files";

const Sidebar = () => {
  const dispatch = useDispatch();

  const ResetFileSelection = () => {
    dispatch(filesActions.setFiles([]));
  };
  
  return (
    <Box width={250} height={850} onClick={ResetFileSelection}>
      <AddButton />
      <PagesButtons/>
      <Quota used={4.64} limit={10}/>
    </Box>

  );
};

export default Sidebar;
