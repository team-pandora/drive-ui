import React from "react";
import { Box } from "@mui/material";
import { TrashData } from "../data/fakedata";
import TableMenuHeader from "../components/BreadCrumbs";
import Table from "../components/tables/Trash";
import i18next from "i18next";

const Trash = () => {
  return (
    <Box flex={4} paddingTop={2} padding={2}>
      <TableMenuHeader hierarchy={[i18next.t("titles.Trash")]} />
      <Table filesArray={TrashData} />
    </Box>
  );
};

export default Trash;
