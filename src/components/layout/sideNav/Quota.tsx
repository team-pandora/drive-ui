import React from "react";
import { Box, styled, Typography, Button, Stack } from "@mui/material";
import NavButton from "./NavButton";
import { CloudQueue } from "@mui/icons-material";
import i18next from "i18next";

const QuotaBox = styled(Box)({
  height: "130px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  // backgroundColor: "pink",
});

const QuotaFillBox = styled(Box)({
  height: "4px",
  backgroundColor: "#1a73e8",
  borderRadius: "2px",
});

const QuotaOutlineBox = styled(Box)({
  width: "180px",
  height: "4px",
  backgroundColor: "#E8E8E8",
  borderRadius: "2px",
  margin: "0 auto",
});

const AddStorageButton = styled(Button)({
  border: "1px solid lightgray",
  width: "60%",
  color: "#1967d2",
});

const Quota: React.FC<{ used: number; limit: number }> = (props) => {
  const quotaUsed = Math.round((100 * props.used) / props.limit);
  return (
    <QuotaBox>
      <NavButton
        path="quota"
        label={i18next.t("sideBar.Storage")}
        icon={<CloudQueue />}
      />
      <Stack alignItems={"center"} spacing={1}>
        <QuotaOutlineBox>
          <QuotaFillBox sx={{ width: quotaUsed }} />
        </QuotaOutlineBox>
        <Typography variant="caption" color={"#5f6368"}>
          {`נוצלו ${props.used} GB מתוך ${props.limit} GB`}
        </Typography>
        <AddStorageButton>{`${"הגדלת שטח אחסון"}`}</AddStorageButton>
      </Stack>
    </QuotaBox>
  );
};

export default Quota;
