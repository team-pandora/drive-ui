import { Box, Divider } from "@mui/material";
import i18next from "i18next";
import React from "react";
import NavigationHeader from "./NavigationHeader";
import NavigationBody from "./NavigationBody";
import NavigationFooter from "./NavigationFooter";

const NavigationPopup = () => {
  const dir = i18next.dir(i18next.language);

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        direction: dir,
        overflow: "hidden",
      }}
    >
      <NavigationHeader/>
      <NavigationBody/>
      <Divider/>
      <NavigationFooter isRoot={false}/>
    </Box>
  );
};

export default NavigationPopup;
