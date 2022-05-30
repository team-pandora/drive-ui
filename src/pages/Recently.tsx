import React from "react";
import { Box } from "@mui/material";
import { RecentData } from "../data/fakedata";
import TableMenuHeader from "../components/BreadCrumbs";
import Table from "../components/tables/Recent";
import i18next from "i18next";

const Recently = () => {
  return (
    <Box flex={4} paddingTop={2} padding={2}>
      <TableMenuHeader hierarchy={[i18next.t("titles.Recent")]} />
      <Table filesArray={RecentData} />
    </Box>
  );
};

export default Recently;
