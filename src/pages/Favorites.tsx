import React from "react";
import { Box } from "@mui/material";
import { FavoritesData } from "../data/fakedata";
import TableMenuHeader from "../components/BreadCrumbs";
import Table from "../components/tables/Favorites";
import i18next from "i18next";

const Favorites = () => {
  return (
    <Box flex={4} paddingTop={2} padding={2}>
      <TableMenuHeader hierarchy={[i18next.t("titles.Favorites")]} />
      <Table filesArray={FavoritesData} />
    </Box>
  );
};

export default Favorites;
