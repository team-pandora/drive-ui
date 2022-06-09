import { useState } from "react";
import { Box, List, styled, Typography } from "@mui/material";
import i18next from "i18next";


const PropertyList = styled(List)({
  color: "gray",
  display: "flex",
  flexDirection: "column",
  gap: "3rem",
  alignItems: "center",
  padding: "2vw"
});

export const InfoProperties = (props: any) => {
  return (
    <PropertyList>
      <Typography>{`${i18next.t("info.Type")}`}</Typography>
      <Typography>{`${i18next.t("info.Size")}`}</Typography>
      <Typography>{`${i18next.t("info.Owner")}`}</Typography>
      <Typography>{`${i18next.t("info.Modified")}`}</Typography>
      <Typography>{`${i18next.t("info.Created")}`}</Typography>
      <Typography>{`${i18next.t("info.HaveAccess")}`}</Typography>
      {props.isDeleted && <Typography>{`${i18next.t("info.Deleted")}`}</Typography>}
    </PropertyList>
  );
};

InfoProperties.defaultProps = {
  isDeleted: false
};
