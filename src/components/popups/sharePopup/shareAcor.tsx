import React, { Fragment, useState } from "react";
import { Box, Grid } from "@mui/material";

import ShareLink from "./ShareLink";
import ShareUsers from "./ShareUsers";

const SharePopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Grid
      direction="column"
    >
      <Grid item>
        <ShareUsers isOpen={isOpen} handleChange={handleChange} />
      </Grid>
      <Box
        style={{
          padding: "5px",
        }}
      ></Box>
      <Grid item>
        <ShareLink isOpen={isOpen} handleChange={handleChange} />
      </Grid>
    </Grid>
  );
};

export default SharePopup;
