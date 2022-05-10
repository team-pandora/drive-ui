import React from 'react';
import { Box } from '@mui/material';
import TableMenuHeader from '../components/BreadCrumbs';
import Table from '../components/tables/Trash1';

const Quota = () => {
    return (
        <Box flex={4} p={2} height={500}>
          <TableMenuHeader hierarchy={["אחסון"]} />
          <Table/>
        </Box>
      );
};

export default Quota;