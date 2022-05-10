import React from "react";
import { Box, styled, Typography } from "@mui/material";
import QuotaButton from "./sideNav/navButtons/QuotaButton";

const QuotaBox = styled(Box)({
  height: "120px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const QuotaFillBox = styled(Box)({
  height: "4px",
  backgroundColor: "red",
  borderRadius: "2px",
});

const QuotaOutlineBox = styled(Box)({
  width: "180px",
  height: "4px",
  backgroundColor: "#E8E8E8",
  borderRadius: "2px",
  margin: "0 auto",
});

const Quota: React.FC<{ used: number, limit: number }> = (props) => {
  const quotaUsed = Math.round((props.used / props.limit) * 10) + "%";

  return (
    <QuotaBox>
      <QuotaButton />
      <QuotaOutlineBox>
        <QuotaFillBox sx={{ width: quotaUsed }} />
      </QuotaOutlineBox>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {`${props.used} MG / ${props.limit} GB`}
      </Typography>
    </QuotaBox>
  );
};

export default Quota;
