import React from "react";
import { Box } from "@mui/material";
import { StatusTransferredData } from "../data/fakedata";
import TableMenuHeader from "../components/BreadCrumbs";
import Table from "../components/tables/StatusTransferred";
import i18next from "i18next";

const StatusTransferred = () => {
  return (
    <Box flex={4} paddingTop={2} padding={2}>
      <TableMenuHeader hierarchy={[i18next.t("titles.StatusFilesSent")]} />
      <Table filesArray={StatusTransferredData} />
    </Box>
  );
};

export default StatusTransferred;
