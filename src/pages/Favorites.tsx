import React from 'react';
import { Box } from '@mui/material';
import TableMenuHeader from "../components/BreadCrumbs";
import Table from '../components/tables/Favorites';
import { FavoritesData } from "../data/fakedata";

const Favorites = () => {
    return (
        <Box flex={4} p={2} height={500}>
          <TableMenuHeader hierarchy={["מסומן בכוכב"]} />
          {/* <Table filesArray={FavoritesData}/> */}
          <Table filesArray={FavoritesData}/>

        </Box>
      );
};

export default Favorites;