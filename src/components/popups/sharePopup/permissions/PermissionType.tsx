import * as React from "react";
import { Box, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import { Check } from "@mui/icons-material";

const PermissionItem: React.FC<{
  label: string;
  checked: boolean;
  onClick: () => void;
}> = (props) => {
  return (
    <MenuItem
      sx={{
        padding: "0px",
        height: "40px",
        display: "flex",
        alignItems: "center",
      }}
      onClick={props.onClick}
      disableRipple
    >
      <Box
        sx={{
          width: "30px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {props.checked && <Check />}
      </Box>
      <Box margin={1}>
        <Typography>{`${props.label}`}</Typography>
      </Box>
    </MenuItem>
  );
};

export default PermissionItem;
