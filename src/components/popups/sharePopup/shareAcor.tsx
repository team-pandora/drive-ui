import React, { useState } from "react";
import {
  Box,

} from "@mui/material";

import ShareLink from "./ShareLink";
import ShareUsers from "./ShareUsers";
const SharePopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <ShareUsers isOpen={isOpen} handleChange={handleChange} />
      <ShareLink isOpen={isOpen} handleChange={handleChange} />
    </Box>
  );
};

export default SharePopup;
