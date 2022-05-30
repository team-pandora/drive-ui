import React from "react";
import { Box } from "@mui/material";
import { SharedData } from "../data/fakedata";
import TableMenuHeader from "../components/BreadCrumbs";
import Table from "../components/tables/Shared";
import i18next from "i18next";

const Shared = () => {
  return (
    <Box flex={4} paddingTop={2} padding={2}>
      <TableMenuHeader hierarchy={[i18next.t("titles.SharedWithMe")]} />
      <Table filesArray={SharedData} />
    </Box>
  );
};

export default Shared;
