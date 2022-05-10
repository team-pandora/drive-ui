import React from 'react';
import { Box } from '@mui/material';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/tables/Trash';
import { TrashData } from "../data/fakedata";

const Trash = () => {
    return (
        <Box flex={4} p={2} height={500}>
          <TableMenuHeader hierarchy={[" אשפה של האחסון שלי"]} />
          <Table filesArray={TrashData}/>
        </Box>
      );
};

export default Trash;