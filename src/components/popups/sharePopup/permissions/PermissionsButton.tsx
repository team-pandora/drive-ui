import * as React from "react";
import Button from "@mui/material/Button";
import { ArrowDropDown } from "@mui/icons-material";

const PermissionButton: React.FC<{
  userPermission: string;
  handleClick: any;
}> = (props) => {
  return (
    <Button
      onClick={props.handleClick}
      sx={{
        width: "130px",
        color: "gray",
        textTransform: "none",
      }}
    >
      {props.userPermission}
      <ArrowDropDown />
    </Button>
  );
};

export default PermissionButton;
