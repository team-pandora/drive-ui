import React from "react";
import { Box, Typography } from "@mui/material";

const GridTitle: React.FC<{ fileName: string; icon: JSX.Element | undefined }> = (
  props
) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "25%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {props.icon}
      <Typography sx={{ fontSize: 12, 
        // padding: "0px 10px",
      }}>{props.fileName}</Typography>
    </Box>
  );
};

export default GridTitle;
