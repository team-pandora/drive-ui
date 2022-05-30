import React from "react";
import { Box, styled, Typography, Button, Stack, Tooltip } from "@mui/material";
import { CloudQueue } from "@mui/icons-material";
import i18next from "i18next";
import CheckIcon from "@mui/icons-material/Check";

const QuotaFillBox = styled(Box)({
  height: "4px",
  width: "100%",
  backgroundColor: "#1a73e8",
  borderRadius: "2px",
});

const QuotaOutlineBox = styled(Box)({
  width: "100px",
  height: "30px",
  margin: "5px",
  backgroundColor: "transparent",
  borderRadius: "2px",
  display: "flex",
  alignItems: "center",
});

const StatusBox = styled(Box)({
  width: "100%",
  height: "30px",
  display: "flex",
  alignItems: "center",
});


const StatusTimeline: React.FC<{ statusArray: any }> = (props) => {
  console.log("statusArray", props.statusArray);
  let color: string = "#E8E8E8";

  if (props.statusArray.some((item: any) => item.type === "success")) {
    console.log("transfer success");
    color = '#00cc00';
  }
  if (props.statusArray.some((item: any) => item.type === "failed")) {
    console.log("transfer failed");
    color = "#ee6055";
  }
  return (
    <StatusBox>
      {props.statusArray.map((status: any) => {
        return (
          <Tooltip title={status.displayName} placement="top">
            <QuotaOutlineBox>
              <QuotaFillBox sx={{ backgroundColor: color }} />
            </QuotaOutlineBox>
          </Tooltip>
        );
      })}
      <CheckIcon sx={{ color: color }}/>
    </StatusBox>
  );
};

export default StatusTimeline;
