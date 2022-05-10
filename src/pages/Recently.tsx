import React from 'react';
import { Box } from '@mui/material';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/tables/Recent';
import { RecentData } from "../data/fakedata";

const Recently = () => {
    return (
        <Box flex={4} p={2} height={500}>
          <TableMenuHeader hierarchy={["לאחרונה"]} />
          <Table filesArray={RecentData}/>
        </Box>
      );
};

export default Recently;