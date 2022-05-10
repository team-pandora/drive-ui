import React from 'react';
import { Box } from '@mui/material';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/tables/Shared';
import { SharedData } from "../data/fakedata";

const Shared = () => {
    return (
        <Box flex={4} p={2} height={500}>
          <TableMenuHeader hierarchy={["קבצים ששותפו איתי"]} />
          <Table filesArray={SharedData}/>
        </Box>
      );
};

export default Shared;